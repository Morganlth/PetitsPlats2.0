/* #||__[tags]__|| */


// #\_IMPORTS_\

    // __JS
    import Filter from '../components/Filter.js'
    import Tag    from '../components/Tag.js'


// #\_CONSTANTES_\

    // __THIS
    const
    TAGS = document.getElementById('TAGS')
    ,
    TAGS_TAGS = new Map()


// #\_FUNCTIONS_\

    // __SET
    function tags_set() { Filter.__filter_$STORE.subscribe(tags_update) }

    // __UPDATES
    function tags_update(ref, remove = false, tag = '')
    {
        if (remove)
        {
            TAGS_TAGS.get   (ref)?.tag_destroy()
            TAGS_TAGS.delete(ref)
        }
        else TAGS_TAGS.set(ref, new Tag(TAGS, ref, tag))
    }


// #\_EXPORTS_\

    // __THIS
    export function tags_init() { tags_set() }