/* #||__[recipe]__|| */


// #\_IMPORTS_\

    // __JS
    import { FILTER_FILTERS } from './filter.js'
    import tree               from '../templates/tree.js'
    import { str_compressed } from '../utils/str.js'
    import { wait_debounce  } from '../utils/wait.js'


function recipe()
{

// #\_PROPS_\

    // __PRIVATES
    const RECIPE = { updateDisplay: recipe_updateDisplay }

    let
    recipe,
    recipe_NAME        = '',
    recipe_DESCRIPTION = '',
    recipe_APPLIANCE   = '',
    recipe_INGREDIENTS = [],
    recipe_USTENSILS   = []


// #\_CONSTRUCTOR_\

    // __THIS
    RECIPE_$STORE.update(RECIPE)

    recipe_set(...arguments)


// #\_FUNCTIONS_\

    // __SET
    function recipe_set()
    {
        recipe_setHTML(...arguments)
        recipe_setVars(...arguments)

        ;[
            [null             , recipe_NAME                                         ],
            [null             , recipe_DESCRIPTION                                  ],
            [RECIPE_FILTERS[0], recipe_INGREDIENTS.map(({ingredient}) => ingredient)],
            [RECIPE_FILTERS[1], recipe_APPLIANCE                                    ],
            [RECIPE_FILTERS[2], recipe_USTENSILS                                    ]
        ]
        .forEach(recipe_setKeywords)
    }

    function recipe_setHTML(parent, {time, image, name, description, ingredients})
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', recipe_getHTML(image, name, time, description, ingredients))
    }

    function recipe_setVars(parent, {name, description, appliance, ingredients, ustensils})
    {
        recipe             = parent.lastElementChild
        recipe_NAME        = name
        recipe_DESCRIPTION = description
        recipe_APPLIANCE   = appliance
        recipe_INGREDIENTS = ingredients
        recipe_USTENSILS   = ustensils
    }

    function recipe_setKeywords([filter = '', value = '' || []])
    {
        let filter_COMPRESSED_OPTIONS = []

        if (FILTER_FILTERS.has(filter))
        {
            const FILTER_OPTIONS = value instanceof Array ? value : [value]

            filter_COMPRESSED_OPTIONS = FILTER_OPTIONS.map(s => str_compressed(s))
    
            FILTER_FILTERS.get(filter)(FILTER_OPTIONS, filter_COMPRESSED_OPTIONS, RECIPE)
        }

        RECIPE_TREE.tree_addWords([...str_compressed(value).split(' '), ...filter_COMPRESSED_OPTIONS], RECIPE)
    }

    // __GET
    function recipe_getHTML(image, name, time, description, ingredients)
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
                                                        ${quantity + (unit ? recipe_getUnit(unit) ?? ' ' + unit : '')}
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

    function recipe_getUnit(unit)
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
    function recipe_updateDisplay(action = 'remove') { recipe.classList[action]('d_non') }


    return RECIPE
}


// #\_EXPORTS_\

    // __THIS
    export default recipe

    export const
    RECIPE_$STORE = (() =>
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
            if (recipe instanceof Object) recipes.add(recipe)

            call()
        }

        function subscribe(f) { if (f instanceof Function && !~SUBSCRIBERS.indexOf(f)) SUBSCRIBERS.push(f) }

        return {set, get, update, subscribe}
    })(),
    RECIPE_TREE    = tree(),
    RECIPE_FILTERS = ['Ingredients', 'Appareils', 'Ustensiles']