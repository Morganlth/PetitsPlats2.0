/* #||__[page]__|| */


// #\_IMPORTS_\

    // __JS
    import EVENTS from '../contexts/Events.js'

    import { searchbar_init                          } from './searchbar.js'
    import { filters_init                            } from './filters.js'
    import { tags_init                               } from './tags.js'
    import { message_init, message_updateTextContent } from './message.js'
    import { recipes_init, recipes_update            } from './recipes.js'


// #\_FUNCTIONS_\

    // __SET
    function page_set() { body_set() }


    function body_set() { body_setEvents() }

    function body_setEvents()
    {
        EVENTS.events_add(
        {
            'writing' : body_eWriting,
            'research': body_eResearch
        },
        document.body)
    }

    // __EVENTS
    function body_eWriting({detail}) { message_updateTextContent(detail.value) }

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
        message_init()
    }