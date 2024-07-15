class Ref
{


// #\-PRIVATES-\

    // --THIS
    #ref = 0


// #\-CONSTRUCTOR-\

    // --THIS
    constructor (ref) { this.#ref = ref }


//=======@GETTER|

    // --*
    get ref() { return this.#ref }


}


class Tree
{


// #\-PRIVATES-\

    // --THIS
    #tree_TREE = new Map()


//=======@GETTER|

    // --*
    get tree_TREE() { return this.#tree_TREE }


//=======@UTILS|

    // --*
    tree_addWords(words = [], ref)
    {
        for (const WORD of words)
        {
            let node = this.#tree_TREE
    
            for (const CHAR of WORD)
            {
                if (!node.has(CHAR)) node.set(CHAR, new Map([['@', new Set()]]))

                node = node.get(CHAR)

                node.get('@').add(ref)
            }
        }
    }

    tree_match(word = '')
    {
        let node = this.#tree_TREE
    
        for (const CHAR of word)
        {
            if (!node.has(CHAR)) return false

            node = node.get(CHAR)
        }

        return node.get('@')
    }


}


class Filter
{

// #\-STATICS-\

    // --*
    static __filter_REFS = new Set()


// #\-PRIVATES-\

    // --THIS
    #options_CURRENT_REFS = new Set()
    #options_OPTIONS      = new Map()

    #options_TREE = new Tree()


// #\-CONSTRUCTOR-\

    // --THIS


//=======@LIFE|

    // --SET

    // --GET
    #options_getRef(s = '') { for (const REF of Filter.__filter_REFS) if (REF.ref === s) return REF }

    // --UPDATES
    #options_update(ref, recipe, option = '', s = '')
    {
        this.#options_CURRENT_REFS.add(ref)
    
        this.#options_OPTIONS.set(ref, { recipes: new Set([recipe]) })

        this.#options_TREE.tree_addWords(s.split(' '), ref)
    }


//=======@UTILS|

    // --*
    options_add(options = [], recipe)
    {
        const OPTIONS = this.#options_OPTIONS

        for (const OPTION of typeof options === 'string' ? [options] : options)
        {
            const
            COMPRESSED = str_compressed(OPTION),
            REF        = this.#options_getRef(COMPRESSED)

            if   (REF) OPTIONS.has(REF) ? OPTIONS.get(REF).recipes.add(recipe) : this.#options_update(REF, recipe, OPTION, COMPRESSED)
            else
            {
                const NEW_REF = new Ref(COMPRESSED)

                Filter.__filter_REFS.add(NEW_REF)
    
                this.#options_update(NEW_REF, recipe, OPTION, COMPRESSED)
            }
        }
    }


}


class Recipe
{

// #\-STATICS-\

    // --*
    static __recipe_$STORE = (() =>
    {
        const SUBSCRIBERS = new Set()

        let recipes = new Set()

        const call = wait_debounce(() => { for (const SUBSCRIBER of SUBSCRIBERS) SUBSCRIBER(recipes) }, 3)

        function set(r = new Set())
        {
            recipes = r

            call()
        }

        function get() { return recipes }

        function update(r)
        {
            if (r instanceof Recipe) recipes.add(r)

            call()
        }

        function subscribe(c) { if (c instanceof Function) SUBSCRIBERS.add(c) }

        return {set, get, update, subscribe}
    })()

    static __recipe_INGREDIENTS_REF = new Ref(0)
    static __recipe_APPLIANCE_REF   = new Ref(1)
    static __recipe_USTENSILS_REF   = new Ref(2)

    static __recipe_FILTERS = new Map([[Recipe.__recipe_INGREDIENTS_REF, new Filter('Ingredients')], [Recipe.__recipe_APPLIANCE_REF, new Filter('Appareils')], [Recipe.__recipe_USTENSILS_REF, new Filter('Ustensiles')]])
    
    static __recipe_TREE = new Tree()


// #\-PRIVATES-\

    // --THIS
    #recipe

    #recipe_ID       = -1
    #recipe_SERVINGS = 0
    #recipe_TIME     = 0

    #recipe_HTML_ID     = 'RECIPE'
    #recipe_IMAGE       = ''
    #recipe_NAME        = ''
    #recipe_DESCRIPTION = ''
    #recipe_APPLIANCE   = ''

    #recipe_INGREDIENTS = []
    #recipe_USTENSILS   = []


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        Recipe.__recipe_$STORE.update(this)

        this.#recipe_set(...arguments)
    }


//=======@LIFE|

    // --SET
    #recipe_set(data = {})
    {
        this.#recipe_setVars(data)

        for (const [REF, S] of
        [
            [false                          , this.#recipe_NAME                                         ],
            [false                          , this.#recipe_DESCRIPTION                                  ],
            [Recipe.__recipe_APPLIANCE_REF  , this.#recipe_APPLIANCE                                    ],
            [Recipe.__recipe_INGREDIENTS_REF, this.#recipe_INGREDIENTS.map(({ingredient}) => ingredient)],
            [Recipe.__recipe_USTENSILS_REF  , this.#recipe_USTENSILS                                    ]
        ])
        this.#recipe_setKeywords(REF, S)
    }

    #recipe_setVars({id, servings, time, image, name, description, appliance, ingredients, ustensils})
    {
        this.#recipe_ID       = id
        this.#recipe_SERVINGS = servings
        this.#recipe_TIME     = time
    
        this.#recipe_HTML_ID    += id == null || document.getElementById(id) ? Recipe.__recipe_getRandomID(): id
        this.#recipe_IMAGE       = image
        this.#recipe_NAME        = name
        this.#recipe_DESCRIPTION = description
        this.#recipe_APPLIANCE   = appliance

        this.#recipe_INGREDIENTS = ingredients
        this.#recipe_USTENSILS   = ustensils
    }

    #recipe_setKeywords(ref, s)
    {
        let filter_KEYWORDS = []

        if (Recipe.__recipe_FILTERS.has(ref))
        {
            Recipe.__recipe_FILTERS.get(ref).options_add(s, this)

            filter_KEYWORDS = (s instanceof Array ? s : [s]).map(s => str_compressed(s))
        }

        Recipe.__recipe_TREE.tree_addWords([...str_compressed(s).split(' '), ...filter_KEYWORDS], this)
    }

    // --GET
    static __recipe_getRandomID()
    {
        const
        S = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
        L = S.length
    
        return Array(8).fill(0).reduce(s => s += S[~~(Math.random() * L)], '')
    }

    static __recipe_getUnit(unit)
    {
        switch (unit)
        {
            case    'cl'         :
            case    'centilitre' :
            case    'centilitres': return 'cl'
            case    'ml'         :
            case    'millilitre' :
            case    'millilitres': return 'ml'
            case    'g'          :
            case    'gramme'     :
            case    'grammes'    : return 'g'
            case    'kg'         :
            case    'kilogramme' :
            case    'kilogrammes': return 'kg'
            default              : return
        }
    }


}


// #\-IMPORTS-\

    // --JS
    import Recipe   from '../templates/Recipe.js'
    import Filter   from '../templates/Filter.js'
    import data_get from '../utils/data.js'


// #\-EXPORTS-\

    // --THIS
    export function recipes_init() { recipes_set() }

    export async function recipes_update(s = '')
    {
        const LENGTH = s.length

        if (LENGTH < recipes_LAST_LENGTH) recipes_resetVars()

        recipes_CURRENT_WORDS = recipes_getWords(s)
        recipes_LAST_LENGTH   = LENGTH
    
        recipes_sort()
    }


// #\-CONSTANTES-\

    // --THIS
    const RECIPES = document.getElementById('RECIPES')


// #\-VARIABLES-\

    // --THIS
    let
    recipes_RECIPES         = new Set(),
    recipes_CURRENT_RECIPES = new Set(),
    recipes_CURRENT_WORDS   = new Set(),
    recipes_FILTERS         = new Set()
    ,
    recipes_LAST_LENGTH = 0


// #\-FUNCTIONS-\

    // --SET
    async function recipes_set()
    {
  await recipes_setVars()
        recipes_resetVars()

        Filter.__filter_$STORE.subscribe(recipes_updateFilters)
    }

    async function recipes_setVars() { recipes_RECIPES = new Set((await data_get()).map(r => new Recipe(r))) }

    // --GET
    function recipes_getWords(s = '')
    {
        const WORDS = new Set()

        for (const WORD of s.split(' ')) if (WORD) WORDS.add(WORD)

        return WORDS
    }

    // --UPDATES
    function recipes_updateFilters(ref, remove = false)
    {
        recipes_FILTERS[remove ? 'delete' : 'add'](ref.ref)

        if (remove) recipes_resetVars()

        recipes_sort()
    }


//=======@UTILS|

    // --*
    function wait_debounce(f = () => {}, n = 0)
    {
        const
        C = this,
        D = wait_getDelay(n)

        let t
    
        function debounce()
        {
            clearTimeout(t)

            t = setTimeout(f.bind(C, ...arguments), D)
        }

        debounce.cb_name = f.name

        return debounce
    }

    function recipes_resetVars() { recipes_CURRENT_RECIPES = new Set(recipes_RECIPES) }

    function recipes_sort()
    {
        for (const WORD of new Set([...recipes_CURRENT_WORDS, ...recipes_FILTERS]))
        {
            const MATCH = Recipe.__recipe_TREE.tree_match(WORD)
            
            if (!MATCH) return recipes_updateDisplay(recipes_CURRENT_RECIPES, true)
        
            for (const RECIPE of recipes_CURRENT_RECIPES) if (!MATCH.has(RECIPE))
            {
                recipes_CURRENT_RECIPES.delete(RECIPE)
            }
        }

        recipes_updateDisplay(recipes_CURRENT_RECIPES)
        
        Recipe.__recipe_$STORE.set(recipes_CURRENT_RECIPES)
    }