/* #||__[events]__|| */


// #\_IMPORTS_\

    // __JS
    import { wait_debounce } from '../utils/wait.js'


// #\_CONSTANTES_\

    // __THIS
    const
    EVENTS_EVENTS   = new Map([['resize', 6], ['click', false]]),
    EVENTS_MANAGERS = new Map()


// #\_FUNCTIONS_\

    // __SET
    ;(function events_auto_set()
    {
        EVENTS_EVENTS.forEach((debounce, event) =>
        {
            events_setVars(event)
            events_setEvents(event, debounce)
        })
    })()

    function events_setVars(event) { EVENTS_MANAGERS.set(event, new Set()) }

    function events_setEvents(event = '', debounce = 0)
    {
        const CALLBACK = events_call.bind(EVENTS_MANAGERS.get(event))
    
        window.addEventListener(event, debounce ? wait_debounce(CALLBACK, debounce) : CALLBACK)
    }

    // __UTILS
    function events_call() { this.forEach(callback => callback(...arguments)) } // this === Set

    function events_testArgs(events) { return events instanceof Object }

    function events_testStringEvent(event = '') { return EVENTS_EVENTS.has(event) }

    function events_testCallback(callback) { return callback instanceof Function }


// #\_EXPORTS_\

    // __THIS
    export function events_add(events = {}, target)
    {
        if (!events_testArgs(events)) return

        for (const EVENT in events)
        {
            if (!target && !events_testStringEvent(EVENT)) continue
            
            const CALLBACK = events[EVENT]
            
            if (!events_testCallback(CALLBACK)) continue

            if (target)
            {
                target.addEventListener(EVENT, CALLBACK)

                continue
            }

            if (EVENTS_MANAGERS.has(EVENT))
            {
                const CALLBACKS = EVENTS_MANAGERS.get(EVENT)
    
                CALLBACKS.add(CALLBACK)
            }
            else CALLBACK(SCREEN)
        }
    }

    export function events_remove(events = {}, target)
    {
        if (!events_testArgs(events)) return

        for (const EVENT in events)
        {
            if (!target && !events_testStringEvent(EVENT)) continue

            const CALLBACK = events[EVENT]
            
            if (!events_testCallback(CALLBACK)) continue

            if   (target) target.removeEventListener(EVENT, CALLBACK)
            else          EVENTS_MANAGERS.get(EVENT)?.delete(CALLBACK)
        }
    }

    export function events_dispatch(target, name = '', detail = {})
    {
        if (target instanceof HTMLElement)
        {
            const EVENT = new CustomEvent(name, { bubbles: true, detail })

            target.dispatchEvent(EVENT)
        }
    }