/*----------------------------------------------- #||--Searchbar--|| */


/*-- #|-CLASS-| --*/

class Searchbar
{

// #\-STATICS-\

    // --*
    #searchbar
    #form
    #input
    #deleter
    #sender

    #input_VALUE = ''


// #\-PRIVATES-\

    // --THIS


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET
    searchbar_set()
    {
        this.#searchbar_setVars(...arguments)
        this.#searchbar_setEvents()
    }

    #searchbar_setVars(searchbar) 
    {
        if (!(searchbar instanceof HTMLElement)) throw new TypeError(`"${searchbar}" is not an HTMLElement.`)

        this.#searchbar = searchbar
        this.#form      = searchbar instanceof HTMLFormElement ? searchbar : searchbar.querySelector('form')
        this.#input     = searchbar.querySelector('input[type="search"]')
        this.#deleter   = searchbar.querySelector('.deleter')
        this.#sender    = searchbar.querySelector('.sender')
    }

    #searchbar_setEvents()
    {
        this.#form   ?.addEventListener('submit', this.#form_eSubmit             )
        this.#input  ?.addEventListener('input' , this.#input_eInput  .bind(this))
        this.#deleter?.addEventListener('click' , this.#deleter_eClick.bind(this))
        this.#sender ?.addEventListener('click' , this.#sender_eClick .bind(this))
    }

    // --GET

    // --UPDATES

    // --TESTS

    // --DESTROY


//=======@EVENTS|

    // --*
    #form_eSubmit(e) { e.preventDefault() }

    #input_eInput()
    {
        const VALUE = str_compressed(this.#input.value)

        if (VALUE !== this.#input_VALUE)
        {
            this.#input_VALUE = VALUE

            this.#searchbar_dispatch()
        }
    }

    #deleter_eClick()
    {
        this.input_reset()
        this.#searchbar_dispatch()
    }

    #sender_eClick()
    {
        this.#searchbar_dispatch()
        this.input_reset()
    }


//=======@UTILS|

    // --*
    #searchbar_dispatch() { this.#searchbar?.dispatchEvent(new CustomEvent('research', { bubbles: true, detail: { value: this.#input_VALUE }}))}

    input_reset() { if (this.#input) this.#input_VALUE = this.#input.value = '' }


}


// #\-IMPORTS-\

    // --ENV

    // --SVELTE

    // --LIB

    // --JS
    import { str_compressed } from '../utils/str.js'


// #\-EXPORTS-\

    // --THIS
    export default Searchbar