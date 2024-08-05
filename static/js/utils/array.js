/* #||__[array]__|| */


// #\_EXPORTS_\

    // __THIS
    // export function array_every(a = [], f = () => void 0)
    // {
    //     for (let i = 0, max = a.length; i < max; i++) if (!f(a[i], i)) return false

    //     return true
    // }

    export function array_filter(a = [], f = () => void 0)
    {
        const A = []

        for (let i = 0, max = a.length; i < max; i++)
        {
            const V = a[i]
    
            if (f(V, i)) A.push(V)
        }

        return A
    }

    // export function array_filterMap(a = [], f = () => void 0)
    // {
    //     const A = []

    //     for (let i = 0, max = a.length; i < max; i++)
    //     {
    //         const V = f(a[i], i)
    
    //         if (V) A.push(V)
    //     }

    //     return A
    // }

    // export function array_find(a = [], f = () => void 0)
    // {
    //     for (let i = 0, max = a.length; i < max; i++) if (f(a[i], i)) return a[i]

    //     return void 0
    // }

    // export function array_findIndex(a = [], f = () => void 0)
    // {
    //     for (let i = 0, max = a.length; i < max; i++) if (f(a[i], i)) return i

    //     return -1
    // }

    export function array_includes(a = [], v)
    {
        for (let i = 0, max = a.length; i < max; i++) if (a[i] === v) return true

        return false
    }

    export function array_indexOf(a = [], v)
    {
        for (let i = 0, max = a.length; i < max; i++) if (a[i] === v) return i

        return -1
    }

    export function array_map(a = [], f = () => void 0)
    {
        const A = Array(a)
    
        for (let i = 0, max = a.length; i < max; i++) A[i] = f(a[i], i)

        return A
    }

    export function array_push(a = [], v)
    {
        if   (v instanceof Array) for (let initial = a.length, i = initial, max = initial + v.length; i < max; i++) a[i] = v[i - initial]
        else                      a[a.length] = v
    }

    export function array_reduce(a = [], f = () => void 0, v)
    {
        for (let i = 0, max = a.length; i < max; i++) v = f(v, a[i], i)

        return v
    }

    // export function array_slice(a = [], s = 0, e)
    // {
    //     const L = a.length

    //     if      (e == null) e = L
    //     else if (e < 0    ) e = e*-1 >= L ? 0 : L + e

    //     const D = e - s

    //     if (D <= 0) return []

    //     const A = Array(D)

    //     for (let i = s, j = 0; i < e; i++) A[j++] = a[i]

    //     return A
    // }

    export function array_splice(a = [], i = 0, r = 0)
    {
        const L = a.length

        if (i >=  L          ) return a
        if (i <   0          ) i = Math.max(L + i, 0)
        if (r === 0          ) r = L - i
        if (i === 0 && r >= L) return []

        const
        I = Math.min(i + r, L),
        A = Array(L - I + i)

        for (let j = 0, k = 0; j < L; j++) if (j < i || j >= I) A[k++] = a[j]

        return A
    }