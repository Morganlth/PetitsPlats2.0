/* #||__[filters]__|| */


// #\_IMPORTS_\

    // __JS
    import Filter from '../components/Filter.js'
    import Recipe from '../components/Recipe.js'


// #\_CONSTANTES_\

    // __THIS
    const FILTERS = document.getElementById('FILTERS')

    // __INSIDE
    const UL = FILTERS?.querySelector('ul')

    const TOTAL = FILTERS?.querySelector('.total')


// #\_FUNCTIONS_\

    // __SET
    function filters_set()
    {
        if (!(UL instanceof HTMLElement)) return

        filter_iter()
        total_set()
    }

    
    function total_set() { Recipe.__recipe_$STORE.subscribe(total_update) }

    // __UPDATES
    function total_update(recipes = new Set()) { if (TOTAL) TOTAL.textContent = (recipes.size ?? 0) + ' recettes' }

    // __UTILS
    function filter_iter() { for (const FILTER of Recipe.__recipe_FILTERS) new Filter(UL, FILTER) }


// #\_EXPORTS_\

    // __THIS
    export function filters_init() { filters_set() }