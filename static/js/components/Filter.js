/* #||__[filter]__|| */


// #\_IMPORTS_\

    // __JS
    import { events_add }    from '../utils/events.js'
    import searchbar         from './searchbar.js'
    import { RECIPE_$STORE } from './recipe.js'
    import Tree              from '../templates/Tree.js'
    import Ref               from '../templates/Ref.js'


function filter(parent, name = '')
{

// #\_PROPS_\

    // __PRIVATES
    let filter

    let controler

    let
    wrapper,
    wrapper_HEIGHT = 0

    let
    options,
    options_TOP          = 0,
    options_CURRENT_REFS = new Set(),
    options_OPTIONS      = new Map(),
    options_TREE         = new Tree()

    let input_reset = () => void 0


// #\_CONSTRUCTOR_\

    // __THIS
    filter_set()

    FILTER_$STORE.subscribe(option_update)
    FILTER_FILTERS.set(name, options_add)


// #\_FUNCTIONS_\

    // __SET
    function filter_set()
    {
        filter_setHTML()
        filter_setVars()
        filter_setEvents()
        controler_set()
        wrapper_set()
        input_set()
        options_set()

        RECIPE_$STORE.subscribe(() => { if (controler.controler_PRESSED) options_sort() })
    }

    function filter_setHTML()
    {
        if (!(parent instanceof HTMLElement)) throw new TypeError(`"${parent}" is not an HTMLElement.`)

        parent.insertAdjacentHTML('beforeend', filter_getHTML(name))
    }

    function filter_setVars() { filter = parent.lastElementChild }

    function filter_setEvents()
    {
        events_add(
        {
            resize: filter_e$Resize,
            click : filter_e$Click
        })

        filter.addEventListener('research', filter_eResearch)
    }


    function controler_set()
    {
        controler_setVars()
        controler_setEvents()
    }

    function controler_setVars() { controler = filter.querySelector('.controler') }

    function controler_setEvents() { controler.addEventListener('click', controler_eClick) }


    function wrapper_set()
    {
        wrapper_setVars()
        wrapper_updateHeightVars()
    }

    function wrapper_setVars() { wrapper = filter.querySelector('.wrapper') }


    function input_set() { input_setVars() }

    function input_setVars() { input_reset = searchbar()(filter) }


    function options_set()
    {
        options_setVars()
        options_updateTopVars()
    }
    
    function options_setVars() { options = filter.querySelector('.options') }


    function option_set(ref, option = '')
    {
        option_setHTML(option)

        const OPTION = options.lastElementChild.querySelector('.option')

        option_setParasites(OPTION, ref)
        option_setEvents(OPTION)

        return OPTION
    }

    function option_setHTML() { options.insertAdjacentHTML('beforeend', option_getHTML(...arguments)) }

    function option_setParasites(e, ref)
    {
        e.option_ACTIVE = false
        e.option_REF    = ref
    }

    function option_setEvents(e) { e.addEventListener('click', option_eClick.bind(e)) }

    // __GET
    function filter_getHTML(name = '')
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


    function options_getRef(ref = '')
    {
        let found

        FILTER_REFS.forEach(r => { if (r.ref === ref) return found = r })

        return found
    }

    function options_getRefs() { return new Set(options_OPTIONS.keys()) }


    function option_getHTML(option = '')
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


    function cross_getHTML()
    {
        return `
            <i
            class="cross d_flx a_ctr"
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
    function filter_updateStyle()
    {
        requestAnimationFrame(() =>
        {
            const
            STYLE  = filter.style,
            CLIP_Y = options_TOP + options.getBoundingClientRect().height

            STYLE.setProperty('--filter_clip_y'         ,                         CLIP_Y + 'px')
            STYLE.setProperty('--background_translate_y', -wrapper_HEIGHT + CLIP_Y + 'px')
        })
    }


    function controler_update()
    {
        const PRESSED = !controler.controler_PRESSED

        if   (PRESSED) options_sort()
        else
        {
            options_updateCurrentRefs()
            input_reset()
        }

        controler_updateProprerties(PRESSED)
    }

    function controler_updateProprerties(pressed = false) { controler.ariaPressed = controler.controler_PRESSED = pressed }


    function wrapper_updateHeightVars() { wrapper_HEIGHT = wrapper.offsetHeight }


    function options_update(ref, recipe, option = '', words = '')
    {
        options_CURRENT_REFS.add(ref)

        options_OPTIONS.set(ref, { element: option_set(ref, option), recipes: new Set([recipe]) })

        options_TREE.tree_addWords(words.split(' '), ref)
    }

    function options_updateOptionsDisplay(options = new Map(), action = 'remove') { for (let [_, {element}] of options) option_updateDisplay(element, action) }

    function options_updateTopVars() { options_TOP = options.offsetTop }

    function options_updateCurrentRefs(words = '')
    {
        const REFS = options_getRefs()

        if (words)
        {
            const WORDS = words.split(' ')
    
            for (let i = 0; i < WORDS.length; i++)
            {
                const
                WORD  = WORDS[i],
                MATCH = options_TREE.tree_match(WORD)
    
                if (!MATCH) { REFS.clear() ;break }
    
                for (const REF of REFS) if (!MATCH.has(REF)) REFS.delete(REF)
            }
        }

        options_CURRENT_REFS = REFS
    }


    function option_update(ref, remove = false)
    {
        let {element} = options_OPTIONS.get(ref) ?? {}

        if (!element) return
    
        option_updateHTML(element, remove)
        option_updateProperties(element, !remove)
    }

    function option_updateHTML(e, remove = false) { remove ? e.querySelector('.cross')?.remove() : e.insertAdjacentHTML('beforeend', cross_getHTML()) }

    function option_updateProperties(e, active = false)
    {
        e.option_ACTIVE = active
        e.classList      [active ? 'add' : 'remove']('active')
    }

    function option_updateDisplay(e, action = 'remove') { e?.classList[action]('d_non') }

    // __EVENTS
    function filter_e$Resize()
    {
        wrapper_updateHeightVars()
        options_updateTopVars()
    }

    function filter_e$Click({target})
    {
        if (!controler.controler_PRESSED) return
        
        while (target)
        {
            if (target === document.body || target === document.documentElement) return controler_update()
            if (target === filter                                              ) return

            target = target.parentNode
        }
    }
    
    function filter_eResearch(e)
    {
        e.stopPropagation()

        options_updateCurrentRefs(e.detail.value)
        options_sort()
    }


    function controler_eClick() { controler_update() }


    function option_eClick() { FILTER_$STORE.update(this.option_REF, this.option_ACTIVE ?? false, this.dataset.option) }

    // __UTILS
    function options_add(options = [], compressedOptions, recipe)
    {
        const OPTIONS = options_OPTIONS

        options.forEach((option, i) =>
        {
            const
            COMPRESSED = compressedOptions[i],
            REF        = options_getRef(COMPRESSED) ?? new Ref(COMPRESSED)

            if   (OPTIONS.has(REF)) OPTIONS.get(REF).recipes.add(recipe)
            else
            {
                FILTER_REFS.add(REF)
    
                options_update(REF, recipe, option, COMPRESSED)
            }
        })
    }

    function options_sort(recipes)
    {
        const
        RECIPES = recipes ?? RECIPE_$STORE.get(),
        REFS    = options_CURRENT_REFS,
        OPTIONS = new Map(options_OPTIONS)

        let removes = true

        OPTIONS.forEach(({element, recipes}, ref) =>
        {
            if (REFS.has(ref)) recipes.forEach(recipe => { if (RECIPES.has(recipe)) return removes = false })

            if (removes)
            {
                OPTIONS.delete(ref)

                option_updateDisplay(element, 'add')
            }
            else removes = true
        })

        options_updateOptionsDisplay(OPTIONS, 'remove')
        filter_updateStyle()
    }


}


// #\_EXPORTS_\

    // __THIS
    export default filter

    export const
    FILTER_$STORE = (() =>
    {
        const SUBSCRIBERS = new Set()

        function update(ref, remove = false, option = '') { SUBSCRIBERS.forEach(subscriber => subscriber(ref, remove, option)) }

        function subscribe(f) { if (f instanceof Function) SUBSCRIBERS.add(f) }

        return {update, subscribe}
    })(),
    FILTER_FILTERS = new Map(),
    FILTER_REFS    = new Set()