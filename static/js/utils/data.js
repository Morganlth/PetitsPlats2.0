/* #||__[data]__|| */


// #\_VARIABLES_\

    // __THIS
    let data_RECIPES // CACHE


// #\_EXPORTS_\

    // __THIS
    export default async function data_get() { return data_RECIPES ??= (await fetch('/static/json/recipes.json'))?.json() ?? [] }