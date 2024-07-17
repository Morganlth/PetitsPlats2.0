

/* #||__[Ref]__|| */


class Ref
{

// #\_PROPS_\

    // __PRIVATES
    #ref = 0


// #\_CONSTRUCTOR_\

    // __THIS
    constructor () { this.#ref_set(...arguments) }


// #\_FUNCTIONS_\

    // __GETTER
    get ref() { return this.#ref }

    // __SET
    #ref_set() { this.#ref_setVars(...arguments) }

    #ref_setVars(ref) { this.#ref = ref }


}


// #\_EXPORTS_\

    // __THIS
    export default Ref