/* #||__[message]__|| */


// #\_IMPORTS_\

    // __JS
    import Recipe from '../components/Recipe.js'


// #\_CONSTANTES_\

    // __THIS
    const MESSAGE = document.getElementById('MESSAGE')


// #\_FUNCTIONS_\

    // __SET
    function message_set()
    {
        message_updateTextContent()

        Recipe.__recipe_$STORE.subscribe(message_updateDisplay)
    }

    // __UPDATES
    function message_updateDisplay(recipes = new Set()) { MESSAGE?.classList[recipes.size ? 'add' : 'remove']('hidden') }


// #\_EXPORTS_\

    // __THIS
    export function message_init() { message_set() }

    export function message_updateTextContent(value = '') { if (MESSAGE) MESSAGE.textContent = `Aucune recette ne contient "${value}" vous pouvez chercher « tarte aux pommes », « poisson », etc.` }