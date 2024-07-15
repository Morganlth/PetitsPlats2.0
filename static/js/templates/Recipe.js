/*----------------------------------------------- #||--Recipe--|| */


/*-- #|-CLASS-| --*/

class Recipe
{

// #\-STATICS-\

    // --*
    static __recipe_$STORE = (() =>
    {
        const SUBSCRIBERS = new Set()

        let recipes = new Set()

        const call = wait_debounce(() => { for (const SUBSCRIBER of SUBSCRIBERS) SUBSCRIBER(recipes) }, 3)

        function set(r = new Set())
        {
            recipes = r

            call()
        }

        function get() { return recipes }

        function update(r)
        {
            if (r instanceof Recipe) recipes.add(r)

            call()
        }

        function subscribe(c) { if (c instanceof Function) SUBSCRIBERS.add(c) }

        return {set, get, update, subscribe}
    })()

    static __recipe_INGREDIENTS_REF = new Ref(0)
    static __recipe_APPLIANCE_REF   = new Ref(1)
    static __recipe_USTENSILS_REF   = new Ref(2)

    static __recipe_FILTERS = new Map([[Recipe.__recipe_INGREDIENTS_REF, new Filter('Ingredients')], [Recipe.__recipe_APPLIANCE_REF, new Filter('Appareils')], [Recipe.__recipe_USTENSILS_REF, new Filter('Ustensiles')]])
    
    static __recipe_TREE = new Tree()


// #\-PRIVATES-\

    // --THIS
    #recipe

    #recipe_ID       = -1
    #recipe_SERVINGS = 0
    #recipe_TIME     = 0

    #recipe_HTML_ID     = 'RECIPE'
    #recipe_IMAGE       = ''
    #recipe_NAME        = ''
    #recipe_DESCRIPTION = ''
    #recipe_APPLIANCE   = ''

    #recipe_INGREDIENTS = []
    #recipe_USTENSILS   = []


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        Recipe.__recipe_$STORE.update(this)

        this.#recipe_set(...arguments)
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET
    #recipe_set(parent, data = {})
    {
        this.#recipe_setVars(data)
        this.#recipe_setHTML(parent)
        this.#recipe_setVars2(parent)

        for (const [REF, S] of
        [
            [false                          , this.#recipe_NAME                                         ],
            [false                          , this.#recipe_DESCRIPTION                                  ],
            [Recipe.__recipe_APPLIANCE_REF  , this.#recipe_APPLIANCE                                    ],
            [Recipe.__recipe_INGREDIENTS_REF, this.#recipe_INGREDIENTS.map(({ingredient}) => ingredient)],
            [Recipe.__recipe_USTENSILS_REF  , this.#recipe_USTENSILS                                    ]
        ])
        this.#recipe_setKeywords(REF, S)
    }

    #recipe_setVars({id, servings, time, image, name, description, appliance, ingredients, ustensils})
    {
        this.#recipe_ID       = id
        this.#recipe_SERVINGS = servings
        this.#recipe_TIME     = time
    
        this.#recipe_HTML_ID    += id == null || document.getElementById(id) ? Recipe.__recipe_getRandomID() : id
        this.#recipe_IMAGE       = image
        this.#recipe_NAME        = name
        this.#recipe_DESCRIPTION = description
        this.#recipe_APPLIANCE   = appliance

        this.#recipe_INGREDIENTS = ingredients
        this.#recipe_USTENSILS   = ustensils
    }

    #recipe_setHTML(parent)
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', Recipe.__recipe_getHTML(
            this.#recipe_HTML_ID    ,
            this.#recipe_IMAGE      ,
            this.#recipe_NAME       ,
            this.#recipe_TIME       ,
            this.#recipe_DESCRIPTION,
            this.#recipe_INGREDIENTS
        ))
    }

    #recipe_setVars2(parent) { this.#recipe = parent.lastElementChild }

    #recipe_setKeywords(ref, s)
    {
        let filter_KEYWORDS = []

        if (Recipe.__recipe_FILTERS.has(ref))
        {
            Recipe.__recipe_FILTERS.get(ref).options_add(s, this)

            filter_KEYWORDS = (s instanceof Array ? s : [s]).map(s => str_compressed(s))
        }

        Recipe.__recipe_TREE.tree_addWords([...str_compressed(s).split(' '), ...filter_KEYWORDS], this)
    }

    // --GET
    static __recipe_getRandomID()
    {
        const
        S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        L = S.length
    
        return Array(8).fill(0).reduce(s => s += S[~~(Math.random() * L)], '')
    }

    static __recipe_getUnit(unit)
    {
        switch (unit)
        {
            case    'cl'         :
            case    'centilitre' :
            case    'centilitres': return 'cl'
            case    'ml'         :
            case    'millilitre' :
            case    'millilitres': return 'ml'
            case    'g'          :
            case    'gramme'     :
            case    'grammes'    : return 'g'
            case    'kg'         :
            case    'kilogramme' :
            case    'kilogrammes': return 'kg'
            default              : return
        }
    }

    static __recipe_getHTML(htmlID, image, name, time, description, ingredients)
    {
        return `
            <article
            id="${htmlID}"
            class="recipe o_h_a o_h_o b_lgh super_scrollbar"
            >
                <header
                class="p_rlt"
                >
                    <img
                    class="d_blc w_any op_c of_c"
                    src="/static/images/photos/${image}"
                    alt="Recette ${name}"
                    >

                    <h2
                    class="b_brd c_drk2 ff_Anton fs_18"
                    >
                        ${name}
                    </h2>

                    <span
                    class="time p_abs b_prm c_drk ff_Manrope fs_12 fw_400"
                    >
                        ${time}min
                    </span>
                </header>

                <main
                class="d_flx f_cl_ b_brd ff_Manrope"
                >
                    <section>
                        <h3
                        class="c_itm fs_12 fw_700"
                        >
                            RECETTE
                        </h3>

                        <p
                        class="description o_hid c_drk fs_14 fw_400"
                        >
                            ${description}
                        </p>
                    </section>

                    <section>
                        <h3
                        class="c_itm fs_12 fw_700"
                        >
                            INGRÉDIENTS
                        </h3>

                        <ul
                        class="d_grd"
                        >
                            ${
                                ingredients?.reduce((html, {ingredient, quantity, unit}) => html += `
                                    <li
                                    class="d_cts"
                                    >
                                        <p
                                        class="c_drk fs_14 fw_500"
                                        >
                                            ${ingredient}

                                            ${quantity
                                                ? `
                                                    <span
                                                    class="quantity d_blc c_itm fw_400"
                                                    >
                                                        ${quantity + (unit ? Recipe.__recipe_getUnit(unit) ?? ' ' + unit : '')}
                                                    </span>
                                                `
                                                : ''
                                            }
                                            
                                        </p>
                                    </li>
                                `,
                                '') ?? ''
                            }
                        </ul>
                    </section>
                </main>
            </article>
        `
    }

    // --UPDATES
    recipe_updateDisplay(action = 'remove') { this.#recipe.classList[action]('d_non') }

    // --TESTS

    // --DESTROY


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*


}


// #\-IMPORTS-\

    // --ENV

    // --SVELTE

    // --LIB

    // --JS
    import Filter             from './Filter.js'
    import Ref                from './Ref.js'
    import Tree               from './Tree.js'
    import { str_compressed } from '../utils/str.js'
    import { wait_debounce  } from '../utils/wait.js'


// #\-EXPORTS-\

    // --THIS
    export default Recipe