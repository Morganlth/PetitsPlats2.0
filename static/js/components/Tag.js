/* #||__[tag]__|| */


// #\_IMPORTS_\

    // __JS
    import { FILTER_$STORE } from './filter.js'


function tag()
{

// #\_PROPS_\

    // __PRIVATES
    let
    tag,
    tag_REF

    let deleter


// #\_CONSTRUCTOR_\

    // __THIS
    tag_set(...arguments)


// #\_FUNCTIONS_\

    // __SET
    function tag_set(parent, ref, name = '')
    {
        tag_setHTML(parent, name)
        tag_setVars(parent, ref)
        deleter_set()
    }

    function tag_setHTML(parent, name)
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', tag_getHTML(name))
    }

    function tag_setVars(parent, ref)
    {
        tag     = parent.lastElementChild
        tag_REF = ref
    }


    function deleter_set()
    {
        deleter_setVars()
        deleter_setEvents()
    }

    function deleter_setVars() { deleter = tag.querySelector('.deleter') }

    function deleter_setEvents() { deleter?.addEventListener('click', deleter_eClick) }

    // __GET
    function tag_getHTML(name = '')
    {
        return `
            <li
            class="tag d_flx j_sbt a_ctr b_prm brd_r_10 super_item"
            >
                ${name}

                <button
                class="deleter"
                aria-label="Supprimer le tag"
                >
                    <i
                    class="d_cts"
                    role="presentation"
                    aria-hidden="true"
                    >
                        <svg
                        class="w_any"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M12 11.5L7 6.5M7 6.5L2 1.5M7 6.5L12 1.5M7 6.5L2 11.5"
                            stroke="#1B1B1B"
                            stroke-width="2.16667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            />
                        </svg>                            
                    </i>
                </button>
            </li>
        `
    }

    // __DESTROY
    function tag_destroy()
    {
        deleter_destroy()

        tag.remove()
    }


    function deleter_destroy() { deleter_destroyEvents() }

    function deleter_destroyEvents() { deleter?.removeEventListener('click', deleter_eClick) }

    // __EVENTS
    function deleter_eClick() { FILTER_$STORE.update(tag_REF, true) }


    return tag_destroy
}


// #\_EXPORTS_\

    // __THIS
    export default tag