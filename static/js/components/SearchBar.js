/* #||__[SearchBar]__|| */


// #\_IMPORTS_\

    // __JS
    import { str_compressed } from '../utils/str.js'


class SearchBar
{

// #\_PROPS_\

    // __PRIVATES
    #searchbar
    #searchbar_BUBBLES = false

    #form

    #input
    #input_VALUE = ''

    #deleter

    #sender


// #\_FUNCTIONS_\

    // __SET
    searchbar_set()
    {
        this.#searchbar_setVars(...arguments)
        this.#form_set()
        this.#input_set()
        this.#deleter_set()
        this.#sender_set()
    }

    #searchbar_setVars(searchbar, bubbles = false) 
    {
        if (!(searchbar instanceof HTMLElement)) throw new TypeError(`"${searchbar}" is not an HTMLElement.`)

        this.#searchbar         = searchbar
        this.#searchbar_BUBBLES = bubbles
    }


    #form_set()
    {
        this.#form_setVars()
        this.#form_setEvents()
    }

    #form_setVars() { this.#form = this.#searchbar instanceof HTMLFormElement ? this.#searchbar : this.#searchbar.querySelector('form') }

    #form_setEvents() { this.#form?.addEventListener('submit', SearchBar.__form_eSubmit) }


    #input_set()
    {
        this.#input_setVars()
        this.#input_setEvents()
    }

    #input_setVars() { this.#input = this.#searchbar.querySelector('input[type="search"]') }

    #input_setEvents() { this.#input?.addEventListener('input', this.#input_eInput.bind(this)) }


    #deleter_set()
    {
        this.#deleter_setVars()
        this.#deleter_setEvents()
    }

    #deleter_setVars() { this.#deleter = this.#searchbar.querySelector('.deleter') }

    #deleter_setEvents() { this.#deleter?.addEventListener('click', this.#deleter_eClick.bind(this)) }


    #sender_set()
    {
        this.#sender_setVars()
        this.#sender_setEvents()
    }

    #sender_setVars() { this.#sender = this.#searchbar.querySelector('.sender') }

    #sender_setEvents() { this.#sender?.addEventListener('click', this.#sender_eClick.bind(this)) }

    // __EVENTS
    static __form_eSubmit(e) { e.preventDefault() }

    #input_eInput()
    {
        const VALUE = str_compressed(this.#input.value)

        if (VALUE !== this.#input_VALUE)
        {
            this.#input_VALUE = VALUE

            this.#searchbar_dispatchResearch()
        }

        if (this.#searchbar_BUBBLES) this.#searchbar_dispatchInput()
    }

    #deleter_eClick()
    {
        this.input_reset()
        this.#searchbar_dispatchResearch()
    }

    #sender_eClick()
    {
        this.#searchbar_dispatchResearch()
        this.input_reset()
    }

    // __UTILS
    #searchbar_dispatchInput() { this.#searchbar?.dispatchEvent(new CustomEvent('writing', { bubbles: true, detail: { value: this.#input.value }})) }

    #searchbar_dispatchResearch() { this.#searchbar?.dispatchEvent(new CustomEvent('research', { bubbles: true, detail: { value: this.#input_VALUE }})) }

    input_reset() { if (this.#input) this.#input_VALUE = this.#input.value = '' }


}


// #\_EXPORTS_\

    // __THIS
    export default SearchBar