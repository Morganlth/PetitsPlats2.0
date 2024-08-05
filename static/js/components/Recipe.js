/* #||__[Recipe]__|| */


// #\_IMPORTS_\

    // __JS
    import Filter             from './Filter.js'
    import Tree               from '../templates/Tree.js'
    import { str_compressed } from '../utils/str.js'
    import { wait_debounce  } from '../utils/wait.js'


class Recipe
{

// #\_PROPS_\

    // __STATICS
    static __recipe_$STORE = (() =>
    {
        const SUBSCRIBERS = []

        let recipes = new Set()

        const call = wait_debounce(() => { SUBSCRIBERS.forEach(subscriber => subscriber(recipes)) }, 3)

        function set(recipes2 = new Set())
        {
            recipes = recipes2

            call()
        }

        function get() { return recipes }

        function update(recipe)
        {
            if (recipe instanceof Recipe) recipes.add(recipe)

            call()
        }

        function subscribe(f) { if (f instanceof Function && !~SUBSCRIBERS.indexOf(f)) SUBSCRIBERS.push(f) }

        return {set, get, update, subscribe}
    })()

    static __recipe_TREE    = new Tree()
    static __recipe_FILTERS = ['Ingredients', 'Appareils', 'Ustensiles']

    // __PRIVATES
    #recipe
    #recipe_NAME        = ''
    #recipe_DESCRIPTION = ''
    #recipe_APPLIANCE   = ''
    #recipe_INGREDIENTS = []
    #recipe_USTENSILS   = []


// #\_CONSTRUCTOR_\

    // __THIS
    constructor ()
    {
        Recipe.__recipe_$STORE.update(this)

        this.#recipe_set(...arguments)
    }


// #\_FUNCTIONS_\

    // __SET
    #recipe_set()
    {
        this.#recipe_setHTML(...arguments)
        this.#recipe_setVars(...arguments)

        ;[
            [null                      , this.#recipe_NAME                                         ],
            [null                      , this.#recipe_DESCRIPTION                                  ],
            [Recipe.__recipe_FILTERS[0], this.#recipe_INGREDIENTS.map(({ingredient}) => ingredient)],
            [Recipe.__recipe_FILTERS[1], this.#recipe_APPLIANCE                                    ],
            [Recipe.__recipe_FILTERS[2], this.#recipe_USTENSILS                                    ]
        ]
        .forEach(this.#recipe_setKeywords, this)
    }

    #recipe_setHTML(parent, {time, image, name, description, ingredients})
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', Recipe.__recipe_getHTML(image, name, time, description, ingredients))
    }

    #recipe_setVars(parent, {name, description, appliance, ingredients, ustensils})
    {
        this.#recipe             = parent.lastElementChild
        this.#recipe_NAME        = name
        this.#recipe_DESCRIPTION = description
        this.#recipe_APPLIANCE   = appliance
        this.#recipe_INGREDIENTS = ingredients
        this.#recipe_USTENSILS   = ustensils
    }

    #recipe_setKeywords([filter = '', value = '' || []])
    {
        let filter_COMPRESSED_OPTIONS = []

        if (Filter.__filter_FILTERS.has(filter))
        {
            const FILTER_OPTIONS = value instanceof Array ? value : [value]

            filter_COMPRESSED_OPTIONS = FILTER_OPTIONS.map(s => str_compressed(s))
    
            Filter.__filter_FILTERS.get(filter).options_add(FILTER_OPTIONS, filter_COMPRESSED_OPTIONS, this)
        }

        Recipe.__recipe_TREE.tree_addWords([...str_compressed(value).split(' '), ...filter_COMPRESSED_OPTIONS], this)
    }

    // __GET
    static __recipe_getHTML(image, name, time, description, ingredients)
    {
        return `
            <article
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

    // __UPDATES
    recipe_updateDisplay(action = 'remove') { this.#recipe.classList[action]('d_non') }


}


// #\_EXPORTS_\

    // __THIS
    export default Recipe