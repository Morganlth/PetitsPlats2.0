/* #||__[tags]__|| */


// #\_IMPORTS_\

    // __JS
    import tag               from '../components/tag.js'
    import { FILTER_$STORE } from '../components/filter.js'


// #\_CONSTANTES_\

    // __THIS
    const
    TAGS = document.getElementById('TAGS')
    ,
    TAGS_TAGS = new Map()


// #\_FUNCTIONS_\

    // __SET
    function tags_set() { FILTER_$STORE.subscribe(tags_update) }

    // __UPDATES
    function tags_update(ref, remove = false, name = '')
    {
        if (remove)
        {
            TAGS_TAGS.get   (ref)() // destroy
            TAGS_TAGS.delete(ref)
        }
        else TAGS_TAGS.set(ref, tag(TAGS, ref, name))
    }


// #\_EXPORTS_\

    // __THIS
    export function tags_init() { tags_set() }