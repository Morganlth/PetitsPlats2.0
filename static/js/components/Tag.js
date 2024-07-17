/* #||__[Tag]__|| */


// #\_IMPORTS_\

    // __JS
    import Filter from './Filter.js'


class Tag
{

// #\_PROPS_\

    // __PRIVATES
    #tag
    #tag_REF

    #deleter


// #\_CONSTRUCTOR_\

    // __THIS
    constructor () { this.#tag_set(...arguments) }


// #\_FUNCTIONS_\

    // __SET
    #tag_set(parent, ref, tag = '')
    {
        this.#tag_setHTML(parent, tag)
        this.#tag_setVars(parent, ref)
        this.#deleter_set()
    }

    #tag_setHTML(parent, tag)
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', Tag.__tag_getHTML(tag))
    }

    #tag_setVars(parent, ref)
    {
        this.#tag     = parent.lastElementChild
        this.#tag_REF = ref
    }


    #deleter_set()
    {
        this.#deleter_setBinding()
        this.#deleter_setVars()
        this.#deleter_setEvents()
    }

    #deleter_setBinding() { this.deleter_eClick = this.deleter_eClick.bind(this) }

    #deleter_setVars() { this.#deleter = this.#tag.querySelector('.deleter') }

    #deleter_setEvents() { this.#deleter?.addEventListener('click', this.deleter_eClick) }

    // __GET
    static __tag_getHTML(tag)
    {
        return `
            <li
            class="tag d_flx j_sbt a_ctr b_prm brd_r_10 super_item"
            >
                ${tag}

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
    tag_destroy()
    {
        this.#deleter_destroy()

        this.#tag.remove()
    }


    #deleter_destroy() { this.#deleter_destroyEvents() }

    #deleter_destroyEvents() { this.#deleter?.removeEventListener('click', this.deleter_eClick) }

    // __EVENTS
    deleter_eClick() { Filter.__filter_$STORE.update(this.#tag_REF, true) }


}


// #\_EXPORTS_\

    // __THIS
    export default Tag