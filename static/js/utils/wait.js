/*----------------------------------------------- #||--wait--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function wait_debounce(f = () => {}, n = 0)
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

    export function wait_throttle(f = () => {}, n = 0, td = 0)
    {
        const
        C = this,
        D = wait_getDelay(n)
    
        let
        l = +new Date()
        ,
        throttle

        if (td)
        {
            const TD = wait_getDelay(td)
    
            let t
    
            throttle = function ()
            {
                const N = +new Date()

                clearTimeout(t)

                N > l + D
                ? (f.apply(C, arguments),
                  l = N)
                : t = setTimeout(() =>
                {
                    f.apply(C, arguments)

                    l = +new Date()
                }, TD)
            }
        }
        else
        {
            throttle = function ()
            {
                const N = +new Date()

                if (N > l + D)
                {
                    f.apply(C, arguments)

                    l = N
                }
            }
        }

        throttle.cb_name = f.name

        return throttle
    }

    export function wait_getDelay(n = 0) { return 1000 / 60 * n }


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*