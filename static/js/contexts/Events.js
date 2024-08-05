/* #||__[Events]__|| */


// #\_IMPORTS_\

    // __JS
    import { wait_debounce  } from '../utils/wait.js'
    import { array_includes } from '../utils/array.js'


class Events
{

// #\_PROPS_\

    // __PRIVATES
    #events_EVENTS   = ['resize', 'click']
    #events_MANAGERS = new Map()


// #\_CONSTRUCTOR_\

    // __THIS
    constructor () { this.#events_set() }


// #\_FUNCTIONS_\

    // __SET
    #events_set()
    {
        this.#events_setBinding()

        const EVENTS = this.#events_EVENTS
    
        for (let i = 0, max = EVENTS.length; i < max; i++)
        {
            const EVENT = EVENTS[i]
    
            this.#events_setVars(EVENT)
            this.#events_setEvents(EVENT, this['events_e' + EVENT.at(0).toUpperCase() + EVENT.slice(1)])
        }
    }

    #events_setBinding() { this.events_eResize = wait_debounce.call(this, this.events_eResize, 6) }

    #events_setVars(event) { this.#events_MANAGERS.set(event, new Set()) }

    #events_setEvents(event, callback) { window.addEventListener(event, callback ?? this.#events_call.bind(this.#events_MANAGERS.get(event))) }

    // __EVENTS
    events_eResize() { this.#events_call.call(this.#events_MANAGERS.get('resize')) }

    // __UTILS
    async #events_call() { for (const CALLBACK of this) CALLBACK(...arguments) } // this === Set

    #events_testArgs(events) { return events instanceof Object }

    #events_testStringEvent(event = '') { return array_includes(this.#events_EVENTS, event) }

    #events_testCallback(callback) { return callback instanceof Function }

    events_add(events = {}, target)
    {
        if (!this.#events_testArgs(events)) return

        for (const EVENT in events)
        {
            if (!target && !this.#events_testStringEvent(EVENT)) continue
            
            const CALLBACK = events[EVENT]
            
            if (!this.#events_testCallback(CALLBACK)) continue

            if (target)
            {
                target.addEventListener(EVENT, CALLBACK)

                continue
            }

            if (this.#events_MANAGERS.has(EVENT))
            {
                const CALLBACKS = this.#events_MANAGERS.get(EVENT)
    
                CALLBACKS.add(CALLBACK)
            }
            else CALLBACK(SCREEN)
        }
    }

    events_remove(events = {}, target)
    {
        if (!this.#events_testArgs(events)) return

        for (const EVENT in events)
        {
            if (!target && !this.#events_testStringEvent(EVENT)) continue

            const CALLBACK = events[EVENT]
            
            if (!this.#events_testCallback(CALLBACK)) continue

            if   (target) target.removeEventListener(EVENT, CALLBACK)
            else          this.#events_MANAGERS.get(EVENT)?.delete(CALLBACK)
        }
    }

    events_dispatch(target, name = '', detail = {})
    {
        if (target instanceof HTMLElement)
        {
            const EVENT = new CustomEvent(name, { bubbles: true, detail })

            target.dispatchEvent(EVENT)
        }
    }


}


// #\_EXPORTS_\

    // __THIS
    export default new Events()