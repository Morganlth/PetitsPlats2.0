/* #||__[recipes]__|| */


// #\_IMPORTS_\

    // __JS
    import Recipe                                                               from '../components/Recipe.js'
    import Filter                                                               from '../components/Filter.js'
    import data_get                                                             from '../utils/data.js'
    import { array_filter, array_indexOf, array_map, array_push, array_splice } from '../utils/array.js'


// #\_CONSTANTES_\

    // __THIS
    const RECIPES = document.getElementById('RECIPES')


// #\_VARIABLES_\

    // __THIS
    let
    recipes_RECIPES         = new Set(),
    recipes_CURRENT_RECIPES = new Set(),
    recipes_CURRENT_WORDS   = [],
    recipes_FILTERS         = []
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

    async function recipes_setVars() { recipes_RECIPES = new Set(array_map(await data_get(), r => new Recipe(RECIPES, r))) }

    // __UPDATES
    function recipes_updateDisplay(recipes = new Set(), hidden = false)
    {
        const ACTION = hidden ? 'add' : 'remove'
    
        for (const RECIPE of recipes) RECIPE.recipe_updateDisplay(ACTION)
    }

    function recipes_updateFilters(ref, remove = false)
    {
        const FILTER = ref.ref

        if (remove)
        {
            const INDEX = array_indexOf(recipes_FILTERS, FILTER)

            if (~INDEX === 0) return

            recipes_FILTERS = array_splice(recipes_FILTERS, INDEX, 1)
    
            recipes_resetVars()
        }
        else array_push(recipes_FILTERS, FILTER)

        recipes_sort()
    }

    // __UTILS
    function recipes_resetVars() { recipes_CURRENT_RECIPES = new Set(recipes_RECIPES) }

    function recipes_sort()
    {
        const WORDS = [...recipes_CURRENT_WORDS, ...recipes_FILTERS]

        let hidden = false

        for (let i = 0, max = WORDS.length; i < max; i++)
        {
            const
            WORD  = WORDS[i],
            MATCH = Recipe.__recipe_TREE.tree_match(WORD)
            
            if (!MATCH) { hidden = true ;break }
        
            for (const RECIPE of recipes_CURRENT_RECIPES) if (!MATCH.has(RECIPE))
            {
                RECIPE.recipe_updateDisplay('add')

                recipes_CURRENT_RECIPES.delete(RECIPE)
            }
        }

        recipes_updateDisplay(recipes_CURRENT_RECIPES, hidden)
        
        Recipe.__recipe_$STORE.set(hidden ? new Set() : recipes_CURRENT_RECIPES)
    }


// #\_EXPORTS_\

    // __THIS
    export function recipes_init() { recipes_set() }

    export async function recipes_update(s = '')
    {
        const LENGTH = s.length

        if (LENGTH < recipes_LAST_LENGTH) recipes_resetVars()

        recipes_CURRENT_WORDS = array_filter(s.split(' '), w => w)
        recipes_LAST_LENGTH   = LENGTH
    
        recipes_sort()
    }