/* #||__[recipes]__|| */


// #\_IMPORTS_\

    // __JS
    import recipe, { RECIPE_$STORE, RECIPE_TREE } from '../components/recipe.js'
    import         { FILTER_$STORE              } from '../components/filter.js'
    import data_get                               from '../utils/data.js'


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

        FILTER_$STORE.subscribe(recipes_updateFilters)
    }

    async function recipes_setVars() { recipes_RECIPES = new Set((await data_get()).map(r => recipe(RECIPES, r))) }

    // __UPDATES
    function recipes_updateDisplay(recipes = new Set(), hidden = false)
    {
        const ACTION = hidden ? 'add' : 'remove'

        recipes.forEach(recipe => recipe.updateDisplay(ACTION))
    }

    function recipes_updateFilters(ref, remove = false)
    {
        const FILTER = ref.ref

        if (remove)
        {
            const INDEX = recipes_FILTERS.indexOf(FILTER)

            if (~INDEX === 0) return
    
            recipes_FILTERS.splice(INDEX, 1)

            recipes_resetVars()
        }
        else recipes_FILTERS.push(FILTER)

        recipes_sort()
    }

    // __UTILS
    function recipes_resetVars() { recipes_CURRENT_RECIPES = new Set(recipes_RECIPES) }

    function recipes_sort()
    {
        let hidden = false

        ;[...recipes_CURRENT_WORDS, ...recipes_FILTERS].forEach(word =>
        {
            const MATCH = RECIPE_TREE.tree_match(word)
            
            if (!MATCH) return hidden = true

            recipes_CURRENT_RECIPES.forEach(recipe =>
            {
                if (!MATCH.has(recipe))
                {
                    recipe.updateDisplay('add')
    
                    recipes_CURRENT_RECIPES.delete(recipe)
                }
            })
        })

        recipes_updateDisplay(recipes_CURRENT_RECIPES, hidden)
        
        RECIPE_$STORE.set(hidden ? new Set() : recipes_CURRENT_RECIPES)
    }


// #\_EXPORTS_\

    // __THIS
    export function recipes_init() { recipes_set() }

    export async function recipes_update(s = '')
    {
        const LENGTH = s.length

        if (LENGTH < recipes_LAST_LENGTH) recipes_resetVars()

        recipes_CURRENT_WORDS = s.split(' ').filter(w => w)
        recipes_LAST_LENGTH   = LENGTH
    
        recipes_sort()
    }