/* #||__[wait]__|| */


// #\_EXPORTS_\

    // __THIS
    export function wait_debounce(f = () => void 0, frame = 0)
    {
        const
        CONTEXT = this,
        DELAY   = wait_getDelay(frame)

        let t
    
        function debounce()
        {
            clearTimeout(t)

            t = setTimeout(f.bind(CONTEXT, ...arguments), DELAY)
        }

        debounce.wait_NAME = f.name

        return debounce
    }

    export function wait_getDelay(frame = 0) { return 1000 / 60 * frame }