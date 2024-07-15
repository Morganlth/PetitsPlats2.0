/*----------------------------------------------- #||--searchbar--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import Searchbar from '../templates/Searchbar.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function searchbar_init() { searchbar_set() }


// #\-CONSTANTES-\

    // --THIS
    const SEARCHBAR = document.getElementById('SEARCHBAR')

    // --INSIDE


// #\-VARIABLES-\

    // --THIS

    // --INSIDE


// #\-FUNCTIONS-\

    // --SET
    function searchbar_set() { new Searchbar().searchbar_set(SEARCHBAR) }

    // --GET

    // --UPDATES

    // --TESTS


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*