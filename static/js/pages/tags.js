/*----------------------------------------------- #||--tags--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import Filter from '../templates/Filter.js'
    import Tag    from '../templates/Tag.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function tags_init() { tags_set() }


// #\-CONSTANTES-\

    // --THIS
    const
    TAGS = document.getElementById('TAGS')
    ,
    TAGS_TAGS = new Map()


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET
    function tags_set() { Filter.__filter_$STORE.subscribe(tags_update) }

    // --GET

    // --UPDATES
    function tags_update(ref, remove = false, tag = '')
    {
        if (remove)
        {
            TAGS_TAGS.get   (ref)?.tag_destroy()
            TAGS_TAGS.delete(ref)
        }
        else TAGS_TAGS.set(ref, new Tag(TAGS, ref, tag))
    }

    // --TESTS

    // --DESTROY


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*