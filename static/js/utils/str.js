/* #||__[str]__|| */


// #\_IMPORTS_\

    // __JS
    import { CONFIG_WORD_MIN_LENGTH } from '../config.js'


// #\_CONSTANTES_\

    // __THIS
    const STR_COMPRESSED_REGEX = new RegExp(`[^\\w\\s]|\\b\\w{1,${CONFIG_WORD_MIN_LENGTH - 1}}\\b`, 'gm')


// #\_EXPORTS_\

    // __THIS
    export function str_normalize(s = '') { return s?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') }

    export function str_compressed(value) // optimize text by removing small words, accents, capital letters, punctuation marks and special characters
    {
        /*
            Strings shorter than “CONFIG_WORD_MIN_LENGTH” are overwritten.
            This means that the beginnings of words such as “co” from “coco”, for example, will not be taken into account.
        */

        return str_normalize((value instanceof Array
        ?  value.reduce((acc, s) => acc += s + ' ', '')
        :  value)
        ?? '')
        .replace(STR_COMPRESSED_REGEX, '')
        .replace(/\s{2,}/gm, ' ')
        .trim()
        .toLowerCase()
    }