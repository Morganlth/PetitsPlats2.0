/* #||__[Tree]__|| */


class Tree
{

// #\_PROPS_\

    // __PRIVATES
    #tree_TREE = new Map()


// #\_FUNCTIONS_\

    // __GETTER
    get tree_TREE() { return this.#tree_TREE }

    // __UTILS
    tree_addWords(words = [], ref)
    {
        words.forEach(word =>
        {
            let node = this.#tree_TREE

            word.split('').forEach(char =>
            {
                if (!node.has(char)) node.set(char, new Map([['@', new Set()]]))

                node = node.get(char)

                node.get('@').add(ref)
            })
        })
    }

    tree_match(word = '')
    {
        let
        node  = this.#tree_TREE,
        found = true

        word.split('').forEach(char =>
        {
            if (!node.has(char)) return found = false

            node = node.get(char)
        })

        return found ? node.get('@') : false
    }


}


// #\_EXPORTS_\

    // __THIS
    export default Tree