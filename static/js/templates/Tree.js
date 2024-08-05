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
        for (let i = 0, iMax = words.length; i < iMax; i++)
        {
            const WORD = words[i]

            let node = this.#tree_TREE
    
            for (let j = 0, jMax = WORD.length; j < jMax; j++)
            {
                const CHAR = WORD[j]
    
                if (!node.has(CHAR)) node.set(CHAR, new Map([['@', new Set()]]))

                node = node.get(CHAR)

                node.get('@').add(ref)
            }
        }
    }

    tree_match(word = '')
    {
        let node = this.#tree_TREE
    
        for (let i = 0, max = word.length; i < max; i++)
        {
            const CHAR = word[i]
    
            if (!node.has(CHAR)) return false

            node = node.get(CHAR)
        }

        return node.get('@')
    }


}


// #\_EXPORTS_\

    // __THIS
    export default Tree