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

    // export function wait_throttle(f = () => void 0, frame = 0, bounce = false)
    // {
    //     const
    //     CONTEXT = this,
    //     DELAY   = wait_getDelay(frame)
    
    //     let
    //     last = +new Date()
    //     ,
    //     throttle

    //     if (bounce)
    //     {
    //         const BOUNCE_DELAY = wait_getDelay(frame + 1)
    
    //         let t
    
    //         throttle = function ()
    //         {
    //             const NOW = +new Date()

    //             clearTimeout(t)

    //             NOW > last + DELAY
    //             ? (f.apply(CONTEXT, arguments), last = NOW)
    //             : t = setTimeout(() =>
    //             {
    //                 f.apply(CONTEXT, arguments)

    //                 last = +new Date()
    //             },
    //             BOUNCE_DELAY)
    //         }
    //     }
    //     else
    //     {
    //         throttle = function ()
    //         {
    //             const NOW = +new Date()

    //             if (NOW > last + DELAY)
    //             {
    //                 f.apply(CONTEXT, arguments)

    //                 last = NOW
    //             }
    //         }
    //     }

    //     throttle.wait_NAME = f.name

    //     return throttle
    // }

    export function wait_getDelay(frame = 0) { return 1000 / 60 * frame }