/*----------------------------------------------- #||--recipes--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import { CONFIG_WORD_MIN_LENGTH } from '../config.js'
    import Recipe                     from '../templates/Recipe.js'
    import data_get                   from '../utils/data.js'
    import { str_normalize          } from '../utils/str.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function recipes_init() { recipes_set() }

    export async function recipes_update(key = '')
    {
        const KEYS = recipes_getKeys(key)

        let show = false

        if (KEYS.length === 0) show = true

        for (const RECIPE of recipes_RECIPES)
        {
            const TEST = show || recipe_test(KEYS, RECIPE.recipe_KEYWORDS_TREE)

            RECIPE.recipe_update(!TEST)
        }
    }


// #\-CONSTANTES-\

    // --THIS
    const RECIPES = document.getElementById('RECIPES')


// #\-VARIABLES-\

    // --THIS
    let recipes_RECIPES


// #\-FUNCTIONS-\

    // --SET
   async function recipes_set()
    {
  await recipes_setVars()
        recipes_setHTML()
    }

    async function recipes_setVars() { recipes_RECIPES = (await data_get()).map(r => new Recipe(r)) }

    function recipes_setHTML()
    {
        if (!(RECIPES instanceof HTMLElement)) return

        for (const RECIPE of recipes_RECIPES)
        {
            RECIPES.insertAdjacentHTML('beforeend', RECIPE.recipe_getHTML())

            RECIPE.recipe = RECIPES.lastElementChild
        }
    }

    // --GET
    function recipes_getKeys(key = '')
    {
        const KEYS = []

        for (const KEY of str_normalize(key.toLowerCase()).split(' ')) if (KEY.length >= CONFIG_WORD_MIN_LENGTH) KEYS.push(KEY)

        return KEYS
    }

    // --UPDATES

    // --TESTS
    // function recipe_test(keys = [], name = '', description = '', ingredients = '')
    // {
    //     for (const KEY of keys) if (!name.includes(KEY) && !description.includes(KEY) && !ingredients.includes(KEY)) return false
    
    //     return true
    // }

    function recipe_test(keys = [], tree = new Map())
    {
        for (const KEY of keys)
        {
            let map = tree
    
            for (const CHAR of KEY)
            {
                if (!map.has(CHAR)) return false

                map = map.get(CHAR)
            }
        }

        return true
    }


//=======@UTILS|

    // --*