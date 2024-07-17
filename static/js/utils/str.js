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

    export function str_compressed(value) // optimise les textes à analiser en supprimant les petis mots, les accents, les majuscules, les signes de ponctuation et les caractères spéciaux
    {
        return str_normalize((value instanceof Array
        ?  value.reduce((acc, s) => acc += s + ' ', '')
        :  value)
        ?? '')
        .replace(STR_COMPRESSED_REGEX, '')
        .replace(/\s{2,}/gm, ' ')
        .trim()
        .toLowerCase()
    }