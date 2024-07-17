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
        for (const WORD of words)
        {
            let node = this.#tree_TREE
    
            for (const CHAR of WORD)
            {
                if (!node.has(CHAR)) node.set(CHAR, new Map([['@', new Set()]]))

                node = node.get(CHAR)

                node.get('@').add(ref)
            }
        }
    }

    tree_match(word = '')
    {
        let node = this.#tree_TREE
    
        for (const CHAR of word)
        {
            if (!node.has(CHAR)) return false

            node = node.get(CHAR)
        }

        return node.get('@')
    }


}


// #\_EXPORTS_\

    // __THIS
    export default Tree