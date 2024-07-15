/*----------------------------------------------- #||--Tree--|| */


/*-- #|-CLASS-| --*/

class Tree
{

// #\-STATICS-\

    // --*


// #\-PRIVATES-\

    // --THIS
    #tree_TREE = new Map()


// #\-PUBLICS-\

    // --THIS


// #\-CONSTRUCTOR-\

    // --THIS
    // constructor () {}


// #\-FUNCTIONS-\

//=======@SETTER|

    // --*


//=======@GETTER|

    // --*
    get tree_TREE() { return this.#tree_TREE }


//=======@LIFE|

    // --SET

    // --GET

    // --UPDATES

    // --TESTS

    // --DESTROY


//=======@EVENTS|

    // --*


//=======@UTILS|

    // --*
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


// #\-IMPORTS-\

    // --ENV

    // --SVELTE

    // --LIB

    // --JS


// #\-EXPORTS-\

    // --THIS
    export default Tree