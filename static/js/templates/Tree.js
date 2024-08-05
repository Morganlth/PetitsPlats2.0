/* #||__[tree]__|| */


function tree()
{

// #\_PROPS_\

    // __PRIVATES
    const TREE_TREE = new Map()

    return {
        tree_addWords: (words = [], ref) =>
        {
            words.forEach(word =>
            {
                let node = TREE_TREE

                word.split('').forEach(char =>
                {
                    if (!node.has(char)) node.set(char, new Map([['@', new Set()]]))

                    node = node.get(char)

                    node.get('@').add(ref)
                })
            })
        },
        tree_match: (word = '') =>
        {
            let
            node  = TREE_TREE,
            found = true

            word.split('').forEach(char =>
            {
                if (!node.has(char)) return found = false

                node = node.get(char)
            })

            return found ? node.get('@') : false
        }
    }
}


// #\_EXPORTS_\

    // __THIS
    export default tree