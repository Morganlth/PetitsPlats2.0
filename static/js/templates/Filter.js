/*----------------------------------------------- #||--Filter--|| */


/*-- #|-CLASS-| --*/

class Filter extends Searchbar
{

// #\-STATICS-\

    // --*
    static __filter_$STORE = (() =>
    {
        const SUBSCRIBERS = new Set()

        function update(ref, remove = false, option = '') { for (const SUBSCRIBER of SUBSCRIBERS) SUBSCRIBER(ref, remove, option) }

        function subscribe(callback) { if (callback instanceof Function) SUBSCRIBERS.add(callback) }

        return {update, subscribe}
    })()

    static __filter_REFS = new Set() // partage les objet ref entre tout les filtres / permet une communication entre les différentes options des filtres


// #\-PRIVATES-\

    // --THIS
    #filter

    #filter_NAME = ''


    #controler


    #wrapper

    #wrapper_HEIGHT = 0


    #options

    #options_TOP = 0

    #options_CURRENT_REFS = new Set()
    #options_OPTIONS      = new Map()

    #options_TREE = new Tree()


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    constructor ()
    {
        super()

        this.#filter_set(...arguments)

        Filter.__filter_$STORE.subscribe(this.#option_update.bind(this))
    }


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*


//=======@LIFE|

    // --SET
    #filter_set()
    {
        this.#filter_setVars(...arguments)
        this.#filter_setEvents()
    }

    #filter_setVars(name = '') { this.#filter_NAME = name }

    #filter_setEvents()
    {
        EVENTS.events_add(
        {
            resize: this.#filter_e$Resize.bind(this),
            click : this.#filter_e$Click .bind(this)
        })
    }


    #option_set(ref, option = '')
    {
        this.#option_setHTML(option)

        const OPTION = this.#options.lastElementChild

        this.#option_setVars(OPTION, ref)
        this.#option_setEvents(OPTION)

        return OPTION
    }

    #option_setHTML() { this.#options.insertAdjacentHTML('beforeend', Filter.__option_getHTML(...arguments)) }

    #option_setVars(e, ref)
    {
        e.option_ACTIVE = false
        e.option_REF    = ref
    }

    #option_setEvents(e) { e.querySelector('button').addEventListener('click', Filter.__option_eClick.bind(e)) }

    // --GET
    static __filter_getHTML(order = 0, name = '')
    {
        return `
            <li
            class="filter p_rlt z_1"
            style="order:${order};"
            >
                <button
                class="controler d_flx j_sbt a_ctr b_brd b_lgh brd_r_11 c_drk f_hrt fw_500 super_item"
                aria-pressed="false"
                >
                    ${name}

                    <i
                    class="p_non"
                    role="presentation"
                    aria-hidden="true"
                    >
                        <svg
                        viewBox="0 0 15 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                            d="M1 1L7.5 7L14 1"
                            stroke="#1B1B1B"
                            stroke-linecap="round"
                            />
                        </svg>
                    </i>
                </button>

                <div
                class="wrapper p_abs t_0 l_0 z_-1 w_any"
                >
                    <div
                    class="container d_flx f_cl_ h_any b_brd ff_Manrope fs_14 fw_400"
                    >
                        <div
                        class="searchbar b_brd"
                        >
                            <form
                            class="d_flx b_brd brd_r_2"
                            >
                                <!--use of the placeholder to check whether the value is empty or not in CSS-->
                                <input
                                class="f_1 h_any b_brd c_itm f_hrt"
                                type="search"
                                placeholder=""
                                >

                                <button
                                class="deleter d_flx j_ctr a_ctr h_any b_brd"
                                type="button"
                                aria-label="Supprimer"
                                >
                                    <i
                                    class="d_flx a_ctr"
                                    role="presentation"
                                    aria-hidden="true"
                                    >
                                        <svg
                                        class="w_any"
                                        viewBox="0 0 8 8"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            d="M7 7L4 4M4 4L1 1M4 4L7 1M4 4L1 7"
                                            stroke="#7A7A7A"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            />
                                        </svg>                                                    
                                    </i>
                                </button>

                                <button
                                class="sender d_flx a_ctr h_any b_brd"
                                type="submit"
                                aria-label="Rechercher"
                                >
                                    <i
                                    class="d_flx a_ctr"
                                    role="presentation"
                                    aria-hidden="true"
                                    >
                                        <svg
                                        class="w_any"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                            cx="5"
                                            cy="5"
                                            r="4.75"
                                            stroke="#7A7A7A"
                                            stroke-width="0.5"
                                            />
    
                                            <line
                                            x1="9.17678"
                                            y1="9.32322"
                                            x2="13.6768"
                                            y2="13.8232"
                                            stroke="#7A7A7A"
                                            stroke-width="0.5"
                                            />
                                        </svg>                                           
                                    </i>
                                </button>
                            </form>
                        </div>

                        <ul
                        class="options d_flx f_cl_ o_h_a o_h_o max_h_any c_drk super_scrollbar"
                        role="listbox"
                        >
                            <li
                            class="whitespace"
                            ><li>
                        </ul>
                    </div>
                </div>
            </li>
        `
    }


    #options_getRef(s = '') { for (const REF of Filter.__filter_REFS) if (REF.ref === s) return REF }

    #options_getRefs() { return new Set(this.#options_OPTIONS.keys()) }


    static __option_getHTML(option = '')
    {
        const OPTION = option.at(0).toUpperCase() + option.slice(1).toLowerCase()

        return `
            <li
            class="option d_cts"
            role="option"
            data-option="${OPTION}"
            >
                <button
                class="d_flx a_ctr w_any c_hrt f_hrt"
                >
                    <span
                    class="f_1 d_blc o_hid w_any"
                    >
                        ${OPTION}
                    </span>
                </button>
            </li>
        `
    }

    static __option_getCrossIconHTML()
    {
        return `
            <i
            class="cross"
            role="presentation"
            aria-hidden="true"
            >
                <svg
                class="w_any"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                    cx="8.5"
                    cy="8.5"
                    r="8.5"
                    fill="black"
                    />

                    <path
                    d="M11 11L8.5 8.5M8.5 8.5L6 6M8.5 8.5L11 6M8.5 8.5L6 11"
                    stroke="#FFD15B"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    />
                </svg>
            </i>
        `
    }

    // --UPDATES
    #filter_updateStyle()
    {
        requestAnimationFrame(() =>
        {
            const
            STYLE  = this.#filter.style,
            CLIP_Y = this.#options_TOP + this.#options.getBoundingClientRect().height

            STYLE.setProperty('--filter_clipY'         ,                         CLIP_Y + 'px')
            STYLE.setProperty('--background_translateY', -this.#wrapper_HEIGHT + CLIP_Y + 'px')
        })
    }

    #filter_updateRecipeStore() { if (this.#controler.controler_PRESSED) this.#options_sort() }


    #controler_update()
    {
        const
        CONTROLER = this.#controler,
        PRESSED   = !CONTROLER.controler_PRESSED

        if   (PRESSED) this.#options_sort()
        else
        {
            this.#options_CURRENT_REFS = this.#options_getRefs()

            this.input_reset()
        }

        CONTROLER.ariaPressed = CONTROLER.controler_PRESSED = PRESSED
    }


    #wrapper_updateVars() { this.#wrapper_HEIGHT = this.#wrapper.offsetHeight }


    #options_updateVars() { this.#options_TOP = this.#options.offsetTop }

    #options_update(ref, recipe, option = '', s = '')
    {
        this.#options_CURRENT_REFS.add(ref)
    
        this.#options_OPTIONS.set(ref, { element: this.#option_set(ref, option), recipes: new Set([recipe]) })

        this.#options_TREE.tree_addWords(s.split(' '), ref)
    }

    #options_updateOptionsDisplay(options = new Map(), hidden = false)
    {
        const ACTION = hidden ? 'add': 'remove'

        for (let [_, {element}] of options) this.#option_updateDisplay(element, ACTION)
    }


    #option_updateDisplay(option, action = 'remove') { option?.classList[action]('d_non') }

    #option_update(ref, remove = false)
    {
        let {element} = this.#options_OPTIONS.get(ref) ?? {}

        if (!element) return
    
        element.option_ACTIVE = !remove
        element.classList       [remove ? 'remove' : 'add']('active')

        remove ? element.querySelector('.cross')?.remove() : element.querySelector('button')?.insertAdjacentHTML('beforeend', Filter.__option_getCrossIconHTML())
    }

    // --TESTS

    // --DESTROY


//=======@EVENTS|

    // --*
    #filter_e$Resize()
    {
        this.#wrapper_updateVars()
        this.#options_updateVars()
    }

    #filter_e$Click({target})
    {
        if (!this.#controler.controler_PRESSED) return
        
        while (true)
        {
            if (!target || target === document.body || target === document.documentElement) return this.#controler_update()
            if (target === this.#filter                                                   ) return

            target = target.parentNode
        }
    }
    
    #filter_eResearch(e)
    {
        e.stopPropagation()
    
        const
        VALUE = e.detail.value,
        REFS  = this.#options_getRefs()

        if (VALUE) for (const WORD of VALUE.split(' '))
        {
            const MATCH = this.#options_TREE.tree_match(WORD)

            if (!MATCH) { REFS.clear() ;break }

            for (const REF of REFS) if (!MATCH.has(REF)) REFS.delete(REF)
        }

        this.#options_CURRENT_REFS = REFS

        this.#options_sort()
    }


    #controler_eClick() { this.#controler_update() }


    static __option_eClick() { Filter.__filter_$STORE.update(this.option_REF, this.option_ACTIVE ?? false, this.dataset.option) }


//=======@UTILS|

    // --*
    #filter_render(parent, order)
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', Filter.__filter_getHTML(order, this.#filter_NAME))

        const FILTER = parent.lastElementChild

        this.#filter    = FILTER
        this.#controler = FILTER.querySelector('.controler')
        this.#wrapper   = FILTER.querySelector('.wrapper')
        this.#options   = FILTER.querySelector('.options')
    }

    #filter_hydrate()
    {
        this.#filter   .addEventListener('research', this.#filter_eResearch.bind(this))
        this.#controler.addEventListener('click'   , this.#controler_eClick.bind(this))
    }

    filter_build()
    {
        this.#filter_render(...arguments)
        this.#filter_hydrate()
        this.searchbar_set(this.#filter)
        this.#wrapper_updateVars()
        this.#options_updateVars()

        Recipe.__recipe_$STORE.subscribe(this.#filter_updateRecipeStore.bind(this))
    }


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

    #options_sort()
    {
        const
        RECIPES = Recipe.__recipe_$STORE.get(),
        REFS    = this.#options_CURRENT_REFS,
        OPTIONS = new Map(this.#options_OPTIONS)

        loop: for (let [ref, {element, recipes}] of OPTIONS)
        {
            if (REFS.has(ref)) for (const RECIPE of recipes) if (RECIPES.has(RECIPE)) continue loop
    
            OPTIONS.delete(ref)

            this.#option_updateDisplay(element, 'add')
        }

        this.#options_updateOptionsDisplay(OPTIONS, false)
        this.#filter_updateStyle()
    }


}


// #\-IMPORTS-\

    // --ENV

    // --SVELTE

    // --LIB

    // --JS
    import EVENTS             from '../contexts/Events.js'
    import Searchbar          from './Searchbar.js'
    import Tree               from './Tree.js'
    import Recipe             from './Recipe.js'
    import Ref                from './Ref.js'
    import { str_compressed } from '../utils/str.js'


// #\-EXPORTS-\

    // --THIS
    export default Filter