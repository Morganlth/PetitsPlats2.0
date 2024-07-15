/*----------------------------------------------- #||--str--|| */


// #\-IMPORTS-\

    // --ENV

    // --DATA

    // --NODE

    // --SVELTE

    // --LIB

    // --JS
    import { CONFIG_WORD_MIN_LENGTH } from '../config.js'

    // --SCSS

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export function str_normalize(s = '') { return s?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') }

    export function str_compressed(s = '') // optimise les textes à analiser en supprimant les petis mots, les accents, les majuscules, les signes de ponctuation et les caractères spéciaux
    {
        if (s instanceof Array) s = s.reduce((s, u) => s += u + ' ', '')

        return str_normalize(s ?? '').replace(STR_COMPRESSED_REGEXP, '').replace(/\s{2,}/gm, ' ').trim().toLowerCase()
    }


// #\-CONSTANTES-\

    // --THIS
    const STR_COMPRESSED_REGEXP = new RegExp(`[^\\w\\s]|\\b\\w{1,${CONFIG_WORD_MIN_LENGTH - 1}}\\b`, 'gm')


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET

    // --UPDATES

    // --TESTS


//=======@UTILS|

    // --*