/*----------------------------------------------- #||--page--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import { searchbar_init               } from './searchbar.js'
    import { filters_init                 } from './filters.js'
    import { tags_init                    } from './tags.js'
    import { recipes_init, recipes_update } from './recipes.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function page_init()
    {
        page_set()
        searchbar_init()
        filters_init() // init filters before recipes !important
        tags_init()
        recipes_init()
    }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET
    function page_set() { body_set() }


    function body_set() { body_setEvents() }

    function body_setEvents()
    {
        const BODY = document.body

        if (!BODY) return

        const EVENTS =
        {
            'research': body_eResearch
        }
    
        for (const EVENT in EVENTS) BODY.addEventListener(EVENT, EVENTS[EVENT])
    }

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*
    function body_eResearch({detail}) { recipes_update(detail.value) }


//=======@UTILS|

    // --*