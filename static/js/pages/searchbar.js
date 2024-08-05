/* #||__[searchbar]__|| */


// #\_IMPORTS_\

    // __JS
    import searchbar from '../components/searchbar.js'


// #\_CONSTANTES_\

    // __THIS
    const SEARCHBAR = document.getElementById('SEARCHBAR')


// #\_FUNCTIONS_\

    // __SET
    function searchbar_set() { searchbar()(SEARCHBAR, true) }


// #\_EXPORTS_\

    // __THIS
    export function searchbar_init() { searchbar_set() }