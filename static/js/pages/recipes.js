/* #||__[recipes]__|| */


// #\_IMPORTS_\

    // __JS
    import Recipe   from '../components/Recipe.js'
    import Filter   from '../components/Filter.js'
    import data_get from '../utils/data.js'


// #\_CONSTANTES_\

    // __THIS
    const RECIPES = document.getElementById('RECIPES')


// #\_VARIABLES_\

    // __THIS
    let
    recipes_RECIPES         = new Set(),
    recipes_CURRENT_RECIPES = new Set(),
    recipes_CURRENT_WORDS   = new Set(),
    recipes_FILTERS         = new Set()
    ,
    recipes_LAST_LENGTH = 0


// #\_FUNCTIONS_\

    // __SET
    async function recipes_set()
    {
        if (!(RECIPES instanceof HTMLElement)) return

  await recipes_setVars()
        recipes_resetVars()

        Filter.__filter_$STORE.subscribe(recipes_updateFilters)
    }

    async function recipes_setVars() { recipes_RECIPES = new Set((await data_get()).map(r => new Recipe(RECIPES, r))) }

    // __GET
    function recipes_getWords(s = '')
    {
        const WORDS = new Set()

        for (const WORD of s.split(' ')) if (WORD) WORDS.add(WORD)

        return WORDS
    }

    // __UPDATES
    function recipes_updateDisplay(recipes = [], hidden = false)
    {
        const ACTION = hidden ? 'add' : 'remove'
    
        for (const RECIPE of recipes) RECIPE.recipe_updateDisplay(ACTION)
    }

    function recipes_updateFilters(ref, remove = false)
    {
        recipes_FILTERS[remove ? 'delete' : 'add'](ref.ref)

        if (remove) recipes_resetVars()

        recipes_sort()
    }

    // __UTILS
    function recipes_resetVars() { recipes_CURRENT_RECIPES = new Set(recipes_RECIPES) }

    function recipes_sort()
    {
        for (const WORD of new Set([...recipes_CURRENT_WORDS, ...recipes_FILTERS]))
        {
            const MATCH = Recipe.__recipe_TREE.tree_match(WORD)
            
            if (!MATCH) return recipes_updateDisplay(recipes_CURRENT_RECIPES, true)
        
            for (const RECIPE of recipes_CURRENT_RECIPES) if (!MATCH.has(RECIPE))
            {
                RECIPE.recipe_updateDisplay('add')

                recipes_CURRENT_RECIPES.delete(RECIPE)
            }
        }

        recipes_updateDisplay(recipes_CURRENT_RECIPES)
        
        Recipe.__recipe_$STORE.set(recipes_CURRENT_RECIPES)
    }


// #\_EXPORTS_\

    // __THIS
    export function recipes_init() { recipes_set() }

    export async function recipes_update(s = '')
    {
        const LENGTH = s.length

        if (LENGTH < recipes_LAST_LENGTH) recipes_resetVars()

        recipes_CURRENT_WORDS = recipes_getWords(s)
        recipes_LAST_LENGTH   = LENGTH
    
        recipes_sort()
    }