/*----------------------------------------------- #||--filters--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import Recipe from '../templates/Recipe.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function filters_init() { filters_set() }


// #\-CONSTANTES-\

    // --THIS
    const FILTERS = document.getElementById('FILTERS')

    // --INSIDE
    const UL = FILTERS?.querySelector('ul')

    const TOTAL = FILTERS?.querySelector('.total')


// #\-VARIABLES-\

    // --THIS
    
    // --INSIDE


// #\-FUNCTIONS-\

    // --SET
    function filters_set()
    {
        if (!(UL instanceof HTMLElement)) return

        filter_iter()
        total_set()
    }

    
    function total_set() { Recipe.__recipe_$STORE.subscribe(total_update) }

    // --GET

    // --UPDATES
    function total_update(s) { if (TOTAL) TOTAL.innerText = (s.size ?? 0) + ' recettes'  }

    // --TESTS


//=======@UTILS|

    // --*


//=======@UTILS|

    // --*
    function filter_iter() { for (const [REF, FILTER] of Recipe.__recipe_FILTERS) FILTER.filter_build(UL, REF.ref) }