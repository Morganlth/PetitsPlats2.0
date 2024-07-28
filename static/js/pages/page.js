/* #||__[page]__|| */


// #\_IMPORTS_\

    // __JS
    import { searchbar_init               } from './searchbar.js'
    import { filters_init                 } from './filters.js'
    import { tags_init                    } from './tags.js'
    import { recipes_init, recipes_update } from './recipes.js'


// #\_FUNCTIONS_\

    // __SET
    function page_set() { body_set() }


    function body_set() { body_setEvents() }

    function body_setEvents() { document.body?.addEventListener('research', body_eResearch) }

    // __EVENTS
    function body_eResearch({detail}) { recipes_update(detail.value) }


// #\_EXPORTS_\

    // __THIS
    export function page_init()
    {
        page_set()
        searchbar_init()
        filters_init() // init filters before recipes !important
        tags_init()
        recipes_init()
    }