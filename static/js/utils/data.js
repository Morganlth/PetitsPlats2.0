/*----------------------------------------------- #||--data--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default async function data_get() { return data_RECIPES ??= (await fetch('/static/json/recipes.json'))?.json() ?? [] }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS
    let data_RECIPES // CACHE


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*