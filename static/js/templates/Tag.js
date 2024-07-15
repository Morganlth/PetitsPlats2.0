/*----------------------------------------------- #||--Tag--|| */


/*-- #|-CLASS-| --*/

class Tag
{

// #\-STATICS-\

    // --*
    #tag

    #tag_REF


    #deleter


// #\-PRIVATES-\

    // --THIS


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor () { this.#tag_set(...arguments) }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET
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

    // --GET
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

    // --UPDATES

    // --TESTS

    // --DESTROY
    tag_destroy()
    {
        this.#deleter_destroy()

        this.#tag.remove()
    }


    #deleter_destroy() { this.#deleter_destroyEvents() }

    #deleter_destroyEvents() { this.#deleter?.removeEventListener('click', this.deleter_eClick) }


//=======@EVENTS|

    // --*
    deleter_eClick() { Filter.__filter_$STORE.update(this.#tag_REF, true) }


//=======@UTILS|

    // --*


}


// #\-IMPORTS-\

    // --ENV

    // --SVELTE

    // --LIB

    // --JS
    import Filter from './Filter.js'


// #\-EXPORTS-\

    // --THIS
    export default Tag