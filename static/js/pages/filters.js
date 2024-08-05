/* #||__[filters]__|| */


// #\_IMPORTS_\

    // __JS
    import filter                            from '../components/filter.js'
    import { RECIPE_$STORE, RECIPE_FILTERS } from '../components/recipe.js'


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

    
    function total_set() { RECIPE_$STORE.subscribe(total_update) }

    // __UPDATES
    function total_update(s) { if (TOTAL) TOTAL.textContent = (s.size ?? 0) + ' recettes' }

    // __UTILS
    function filter_iter() { RECIPE_FILTERS.forEach(fltr => filter(UL, fltr)) }


// #\_EXPORTS_\

    // __THIS
    export function filters_init() { filters_set() }