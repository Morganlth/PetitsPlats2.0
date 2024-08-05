/* #||__[searchbar]__|| */


// #\_IMPORTS_\

    // __JS
    import { str_compressed } from '../utils/str.js'


function searchbar()
{

// #\_PROPS_\

    // __PRIVATES
    let
    searchbar,
    searchbar_BUBBLES = false

    let form

    let
    input,
    input_VALUE = ''

    let deleter

    let sender


// #\_FUNCTIONS_\

    // __SET
    function searchbar_set()
    {
        searchbar_setVars(...arguments)
        form_set()
        input_set()
        deleter_set()
        sender_set()

        return input_reset
    }

    function searchbar_setVars(sb, bubbles = false) 
    {
        if (!(sb instanceof HTMLElement)) throw new TypeError(`"${sb}" is not an HTMLElement.`)

        searchbar         = sb
        searchbar_BUBBLES = bubbles
    }


    function form_set()
    {
        form_setVars()
        form_setEvents()
    }

    function form_setVars() { form = searchbar instanceof HTMLFormElement ? searchbar : searchbar.querySelector('form') }

    function form_setEvents() { form?.addEventListener('submit', form_eSubmit) }


    function input_set()
    {
        input_setVars()
        input_setEvents()
    }

    function input_setVars() { input = searchbar.querySelector('input[type="search"]') }

    function input_setEvents() { input?.addEventListener('input', input_eInput) }


    function deleter_set()
    {
        deleter_setVars()
        deleter_setEvents()
    }

    function deleter_setVars() { deleter = searchbar.querySelector('.deleter') }

    function deleter_setEvents() { deleter?.addEventListener('click', deleter_eClick) }


    function sender_set()
    {
        sender_setVars()
        sender_setEvents()
    }

    function sender_setVars() { sender = searchbar.querySelector('.sender') }

    function sender_setEvents() { sender?.addEventListener('click', sender_eClick) }

    // __EVENTS
    function form_eSubmit(e) { e.preventDefault() }

    function input_eInput()
    {
        const VALUE = str_compressed(input.value)

        if (VALUE !== input_VALUE)
        {
            input_VALUE = VALUE

            searchbar_dispatchResearch()
        }

        if (searchbar_BUBBLES) searchbar_dispatchInput()
    }

    function deleter_eClick()
    {
        input_reset()
        searchbar_dispatchResearch()
    }

    function sender_eClick()
    {
        searchbar_dispatchResearch()
        input_reset()
    }

    // __UTILS
    function searchbar_dispatchInput() { searchbar?.dispatchEvent(new CustomEvent('writing', { bubbles: true, detail: { value: input.value }})) }

    function searchbar_dispatchResearch() { searchbar?.dispatchEvent(new CustomEvent('research', { bubbles: true, detail: { value: input_VALUE }})) }

    function input_reset() { if (input) input_VALUE = input.value = '' }


    return searchbar_set
}


// #\_EXPORTS_\

    // __THIS
    export default searchbar