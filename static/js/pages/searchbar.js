/* #||__[searchbar]__|| */


// #\_IMPORTS_\

    // __JS
    import SearchBar from '../components/SearchBar.js'


// #\_CONSTANTES_\

    // __THIS
    const SEARCHBAR = document.getElementById('SEARCHBAR')


// #\_FUNCTIONS_\

    // __SET
    function searchbar_set() { new SearchBar().searchbar_set(SEARCHBAR) }


// #\_EXPORTS_\

    // __THIS
    export function searchbar_init() { searchbar_set() }