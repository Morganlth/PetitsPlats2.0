/* #||__[Filter]__|| */


// #\_IMPORTS_\

    // __JS
    import EVENTS    from '../contexts/Events.js'
    import Searchbar from './SearchBar.js'
    import Recipe    from './Recipe.js'
    import Tree      from '../templates/Tree.js'
    import Ref       from '../templates/Ref.js'


class Filter extends Searchbar
{

// #\_PROPS_\

    // __STATICS
    static __filter_$STORE = (() =>
    {
        const SUBSCRIBERS = new Set()

        function update(ref, remove = false, option = '') { for (const SUBSCRIBER of SUBSCRIBERS) SUBSCRIBER(ref, remove, option) }

        function subscribe(f) { if (f instanceof Function) SUBSCRIBERS.add(f) }

        return {update, subscribe}
    })()

    static __filter_FILTERS = new Map()
    static __filter_REFS    = new Set() // partage les objet ref entre tout les filtres / permet une communication entre les différentes options des filtres

    // __PRIVATES
    #filter

    #controler

    #wrapper
    #wrapper_HEIGHT = 0

    #options
    #options_TOP          = 0
    #options_CURRENT_REFS = new Set()
    #options_OPTIONS      = new Map()
    #options_TREE         = new Tree()


// #\_CONSTRUCTOR_\

    // __THIS
    constructor (parent, name = '')
    {
        super()

        this.#filter_set(parent, name)

        Filter.__filter_$STORE.subscribe(this.#option_update.bind(this))
        Filter.__filter_FILTERS.set(name, this)
    }


// #\_FUNCTIONS_\

    // __SET
    #filter_set(parent, name)
    {
        this.#filter_setHTML(parent, name)
        this.#filter_setVars(parent)
        this.#filter_setEvents()
        this.#controler_set()
        this.#wrapper_set()
        this.#options_set()
        this.searchbar_set(this.#filter)

        Recipe.__recipe_$STORE.subscribe(() => { if (this.#controler.controler_PRESSED) this.#options_sort() })
    }

    #filter_setHTML(parent, name)
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', Filter.__filter_getHTML(name))
    }

    #filter_setVars(parent) { this.#filter = parent.lastElementChild }

    #filter_setEvents()
    {
        EVENTS.events_add(
        {
            resize: this.#filter_e$Resize.bind(this),
            click : this.#filter_e$Click .bind(this)
        })

        this.#filter.addEventListener('research', this.#filter_eResearch.bind(this))
    }


    #controler_set()
    {
        this.#controler_setVars()
        this.#controler_setEvents()
    }

    #controler_setVars() { this.#controler = this.#filter.querySelector('.controler') }

    #controler_setEvents() { this.#controler.addEventListener('click', this.#controler_eClick.bind(this)) }


    #wrapper_set()
    {
        this.#wrapper_setVars()
        this.#wrapper_updateHeightVars()
    }

    #wrapper_setVars() { this.#wrapper = this.#filter.querySelector('.wrapper') }


    #options_set()
    {
        this.#options_setVars()
        this.#options_updateTopVars()
    }
    
    #options_setVars() { this.#options = this.#filter.querySelector('.options') }


    #option_set(ref, option = '')
    {
        this.#option_setHTML(option)

        const OPTION = this.#options.lastElementChild.querySelector('.option')

        this.#option_setParasites(OPTION, ref)
        this.#option_setEvents(OPTION)

        return OPTION
    }

    #option_setHTML() { this.#options.insertAdjacentHTML('beforeend', Filter.__option_getHTML(...arguments)) }

    #option_setParasites(e, ref)
    {
        e.option_ACTIVE = false
        e.option_REF    = ref
    }

    #option_setEvents(e) { e.addEventListener('click', Filter.__option_eClick.bind(e)) }

    // __GET
    static __filter_getHTML(name = '')
    {
        return `
            <li
            class="filter p_rlt z_1"
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


    #options_getRef(ref = '') { for (const REF of Filter.__filter_REFS) if (REF.ref === ref) return REF }

    #options_getRefs() { return new Set(this.#options_OPTIONS.keys()) }


    static __option_getHTML(option = '')
    {
        const OPTION = option.at(0).toUpperCase() + option.slice(1).toLowerCase()

        return `
            <li
            class="d_cts"
            >
                <button
                class="option d_flx a_ctr w_any c_hrt f_hrt"
                role="option"
                data-option="${OPTION}"
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


    static __cross_getHTML()
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

    // __UPDATES
    #filter_updateStyle()
    {
        requestAnimationFrame(() =>
        {
            const
            STYLE  = this.#filter.style,
            CLIP_Y = this.#options_TOP + this.#options.getBoundingClientRect().height

            STYLE.setProperty('--filter_clip_y'         ,                         CLIP_Y + 'px')
            STYLE.setProperty('--background_translate_y', -this.#wrapper_HEIGHT + CLIP_Y + 'px')
        })
    }


    #controler_update()
    {
        const PRESSED = !this.#controler.controler_PRESSED

        if   (PRESSED) this.#options_sort()
        else
        {
            this.#options_updateCurrentRefs()
            this.input_reset()
        }

        this.#controler_updateProprerties(PRESSED)
    }

    #controler_updateProprerties(pressed = false) { this.#controler.ariaPressed = this.#controler.controler_PRESSED = pressed }


    #wrapper_updateHeightVars() { this.#wrapper_HEIGHT = this.#wrapper.offsetHeight }


    #options_update(ref, recipe, option = '', words = '')
    {
        this.#options_CURRENT_REFS.add(ref)

        this.#options_OPTIONS.set(ref, { element: this.#option_set(ref, option), recipes: new Set([recipe]) })

        this.#options_TREE.tree_addWords(words.split(' '), ref)
    }

    #options_updateOptionsDisplay(options = new Map(), action = 'remove') { for (let [_, {element}] of options) this.#option_updateDisplay(element, action) }

    #options_updateTopVars() { this.#options_TOP = this.#options.offsetTop }

    #options_updateCurrentRefs(words = '')
    {
        const REFS = this.#options_getRefs()

        if (words) for (const WORD of words.split(' '))
        {
            const MATCH = this.#options_TREE.tree_match(WORD)

            if (!MATCH) { REFS.clear() ;break }

            for (const REF of REFS) if (!MATCH.has(REF)) REFS.delete(REF)
        }

        this.#options_CURRENT_REFS = REFS
    }


    #option_update(ref, remove = false)
    {
        let {element} = this.#options_OPTIONS.get(ref) ?? {}

        if (!element) return
    
        this.#option_updateHTML(element, remove)
        this.#option_updateProperties(element, !remove)
    }

    #option_updateHTML(e, remove = false) { remove ? e.querySelector('.cross')?.remove() : e.insertAdjacentHTML('beforeend', Filter.__cross_getHTML()) }

    #option_updateProperties(e, active = false)
    {
        e.option_ACTIVE = active
        e.classList      [active ? 'add' : 'remove']('active')
    }

    #option_updateDisplay(e, action = 'remove') { e?.classList[action]('d_non') }

    // __EVENTS
    #filter_e$Resize()
    {
        this.#wrapper_updateHeightVars()
        this.#options_updateTopVars()
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

        this.#options_updateCurrentRefs(e.detail.value)
        this.#options_sort()
    }


    #controler_eClick() { this.#controler_update() }


    static __option_eClick() { Filter.__filter_$STORE.update(this.option_REF, this.option_ACTIVE ?? false, this.dataset.option) }

    // __UTILS
    options_add(options = [], compressedOptions, recipe)
    {
        const OPTIONS = this.#options_OPTIONS

        for (let i = 0; i < options.length; i++)
        {
            const
            COMPRESSED = compressedOptions[i],
            REF        = this.#options_getRef(COMPRESSED) ?? new Ref(COMPRESSED)

            if   (OPTIONS.has(REF)) OPTIONS.get(REF).recipes.add(recipe)
            else
            {
                Filter.__filter_REFS.add(REF)
    
                this.#options_update(REF, recipe, options[i], COMPRESSED)
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

        this.#options_updateOptionsDisplay(OPTIONS, 'remove')
        this.#filter_updateStyle()
    }


}


// #\_EXPORTS_\

    // __THIS
    export default Filter