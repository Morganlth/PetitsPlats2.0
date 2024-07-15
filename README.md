# **Doc**

Cette documentation décrit et argumente le code de @morganlth.

> *Les [**liens**]() en gras correspondent aux sections du doc.*<br>
> *Les textes entre crochets <sup>`[x]`</sup> correspondent à des drapeaux de section à titre indicatif.*

# Sommaire Général

1. [**Subject Programming**](#le-subject-programming)
2. [**Le Nommage**](#le-nommage)
    1. [**SCREAMING_SNAKE_CASE**](#le-screaming-snake-case)
    2. [**camelCase**](#le-camel-case)
    3. [**snake_case**](#le-snake-case)
    4. [**subject_SCREAMING_SNAKE_CASE**](#le-subject-screaming-snake-case)
    5. [**subject_camelCase**](#le-subject-camel-case)
3. [**Les Schémas**](#les-schémas)
4. [**Le CSS**](#le-css) <sup>`[css]`</sup>
    1. [**Les Schémas**](#les-schémas-css)
        1. [**Principal**](#le-schéma-principal)
        2. [**Modulaire**](#le-schéma-modulaire)
    2. [**Intégration**](#intégration-css)
    3. [**Les Sélécteurs**](#les-sélecteurs)
        1. [**ID**](#sélecteur-par-id)
        2. [**Classe**](#sélecteur-par-classe)
        3. [**Classe Utilitaire**](#sélecteur-par-classe-utilitaire)
        4. [**Super Classe**](#sélecteur-par-super-classe)
5. [**Le JavaScript**](#le-javascript) <sup>`[js]`</sup>
    1. [**Intégration**](#intégration-javascript)
    2. [**Les Schémas**](#les-schémas-javascript)
        1. [**Fonctionnel**](#le-schéma-fonctionnel) <sup>`[func]`</sup>
            1. [**Imports**](#1-les-imports)
            2. [**Constantes**](#2-les-constantes)
            3. [**Variables**](#3-les-variables)
            4. [**Fonctions**](#4-les-fonctions)
            5. [**Exports**](#5-les-exports)
        2. [**Objet**](#le-schéma-objet) <sup>`[obj]`</sup>
            1. [**Imports**](#1-les-imports-1)
            2. [**Propriétés**](#2-les-propriétés)
            3. [**Constructeur**](#3-le-constructeur)
            4. [**Méthodes**](#4-les-méthodes)
            5. [**Exports**](#5-les-exports-1)
6. [**Résumé**](#résumer)

<br>

# Le Subject Programming
<sup>`[css]`</sup> <sup>`[js]`</sup>

Pour bien saisir les concepts abordés dans cette documentation, il faut comprendre ce qu'est le **Subject Programming**.

Ce modèle de programmation est utilisé en **CSS** et **JavaScript** pour associer une **entité**\* à un **sujet**\*.<br>
Ceci dans le but d'améliorer la compréhension du code.

> *Le mot **entité**\* inclut tous les concepts, fichiers et composantes des divers langages web.*<br>
> *Par exemple une **classe** CSS, une **constante** JavaScript, une **fonction**, etc.*

> *Le **sujet**\* peut aussi être nommé **contexte** ou **thématique**.*

Exemple de code **sans** sujet:

```js
const NAME = 'John Doe'

let age = 7

function birthday()
{
    console.log(`${++age} years! Happy Birthday ${NAME}!`)
}
```

Qu'elle est le **sujet** dans ce code ?

Voici le même exemple avec un sujet explicite:

```js
const CAT_NAME = 'John Doe'

let cat_AGE = 7

function cat_birthday()
{
    console.log(`${++age} years! Happy Birthday ${CAT_NAME}!`)
}
```

Le sujet était un **chat** !

Dans cet exemple, pour chaque entité (fichier, constante, variable, fonction) le **sujet** est **cat**.

> *Notez qu'il est toujours écrit explicitement dans le nommage de l'entité.*

Pour ceux qui auront des doutes sur ce modèle, en langue une phrase se construit toujours avec un sujet (sauf infinitif et exception) car **il** n'est pas négligeable.

> *Un fichier **.css** et **.js** aura **toujours un sujet** défini par son nom (ex: dans **cat.css** le sujet est **cat**).*

> *Chaque entité à un sujet **indépendant** (2 entités dans un même fichier n'auront pas forcément le même sujet).*

<br>

# Le Nommage
<sup>`[html]`</sup> <sup>`[css]`</sup> <sup>`[js]`</sup>

## **Sommaire**

1. [**SCREAMING_SNAKE_CASE**](#le-screaming-snake-case)
2. [**camelCase**](#le-camel-case)
3. [**snake_case**](#le-snake-case)
4. [**subject_SCREAMING_SNAKE_CASE**](#le-subject-screaming-snake-case)
5. [**subject_camelCase**](#le-subject-camel-case)

<br>

> *Le nommage inclut les fichiers **.html**, **.css** et **.js**.*

<br>

## **Le Screaming Snake Case**
<sup>`[html]`</sup> <sup>`[css]`</sup> <sup>`[js]`</sup>

Le **SCREAMING_SNAKE_CASE** est une notation dans laquelle les mots sont en **MAJUSCULES** et séparés d'**underscore** `_`.

> *Syntaxe: `MOT1_MOT2`*

<br>

Les **entités** concernées sont uniques et immuables:

* `id` HTML
* Id CSS
* `const` JavaScript

<br>

```html
<!-- html -->
<div
id="CONTAINER"
></div>
```

```css
/* css */
#CONTAINER { /* ... */ }
```

```js
// js
const CONTAINER = document.getElementById('CONTAINER')
```

<br>

## **Le Camel Case**
<sup>`[html]`</sup> <sup>`[css]`</sup> <sup>`[js]`</sup>

Le **camelCase** est une forme dans laquelle chaque mot au milieu de la phrase commence par une **MAJUSCULE**, sans espace ni ponctuation.

> *Syntaxe: `mot1Mot2`*

<br>

Les **entités** concernées sont:

* `class` HTML
* Classe CSS
* Les propriétés d'`Objet` JavaScript

<br>

```html
<!-- html -->
<div
class="myContainer"
></div>
```

```css
/* css */
.myContainer { /* ... */ }
```

```js
// js
{
    myContainer: document.querySelector('.myContainer')
}
```

<br>

## **Le Snake Case**
<sup>`[html]`</sup> <sup>`[css]`</sup>

Le **snake_case** est une notation ou les mots sont en **minuscules** et séparés d'**underscore** `_`.

> *Syntaxe: `mot1_mot2`*

<br>

Les **entités** concernées sont:

* `class` HTML
* Classe CSS

<br>

```html
<!-- html -->
<div
class="super_container d_flx"
></div>
```

```css
/* css */
.super_container.d_flx { /* ... */ }
```

<br>

## **Le Subject Screaming Snake Case**
<sup>`[js]`</sup>

Le **subject_SCREAMING_SNAKE_CASE** est une nouvelle syntaxe utilisant le [**Subject Programming**](#le-subject-programming) et représentant une **valeur**.

Il se décompose en **2 parties** séparées par un underscore `_`:

1. le **sujet** en minuscule
2. le **label** (facultatif) écrit en [**SCREAMING_SNAKE_CASE**](#le-screaming-snake-case)

<br>

> *Syntaxe: `sujet_LABEL`*

<br>

Les **entités** concernées sont:

* `let` / `var`
* Les propriétés **parasites**\* 
* Les **propriétés** de `class` JavaScript

<br>

> ***Parasite**\* est une propriété ajoutée à un Objet natif.*<br>
> *Par exemple, une propriété ajoutée sur un `HTMLElement`.*

```js
// js
let user_FIRST_NAME = 'John'

var user_LAST_NAME  = 'Doe'

window.user_AGE = 22 // parasite

class User
{
    user_NAME = 'John Doe'
}
```

Une variante précédée d'un **double underscore** `__` existe pour les **propriétés** `static`:

```js
// js
class User
{
    static __user_DEFAULT_NAME = 'John Doe'
}
```

> *Notez que les noms de `class` utilisent le **PascalCase**.*

<br>

## **Le Subject Camel Case**
<sup>`[js]`</sup>

Le **subject_camelCase** est une nouvelle syntaxe utilisant le [**Subject Programming**](#le-subject-programming) et représentant une **action**.

Il se décompose en **3 parties**:

1. le **sujet** en minuscule
2. l'**action** (facultatif) en minuscule
3. le **label** (facultatif) écrit en **PascalCase**

<br>

> *Syntaxe: `sujet_actionLabel`*

<br>

Les **entités**\* concernées sont:

* `function`
* Les **méthodes** de `class` JavaScript

<br>

```js
// js
function user_getFirstName() { return 'John' }

class User
{
    user_getLastName() { return 'Doe' }
}
```

Une variante précédée d'un **double underscore** `__` existe pour les **méthodes** `static`:

```js
// js
class User
{
    static __user_getName() { return 'John Doe' }
}
```

> *Notez que les entités précédées du mot-clé `static` préfixent toujours le nommage d'un **double underscore** `__`.*

<br>

# Les Schémas

Un **schéma** correspond à une organisation structurée du code et balisée par des **commentaires**.

Les **commentaires** servent à définir la structure du fichier CSS / JavaScript et se décomposent en **3 types**:

1. **Sujet** `#||__[subject]__||`
2. **Balises** `#\_BALISE_\`
3. **Sous-balises** `__SOUS_BALISE`.

<br>

```js
/* #||__[subject]__|| */

// #\_BALISE_\

    // __SOUS_BALISE
```

Dans le premier commentaire `#||__[subject]__||`, le **subject** correspond au **sujet** principal du fichier (voir le [**Subject Programming**](#le-subject-programming)).<br>
Par exemple dans un fichier **page.js**, `subject` sera remplacé par `page` (le nom du fichier correspond au sujet).

<br>

# Le CSS
<sup>`[css]`</sup>

## **Sommaire**

1. [**Les Schémas**](#les-schémas-css)
2. [**Intégration**](#intégration-css)
3. [**Les Sélécteurs**](#les-sélecteurs)

<br>

## **Les Schémas CSS**

Il n'existe que **2 types** de schémas CSS:

1. [**Le Schéma Principal**](#le-schéma-principal)
2. [**Le Schéma Modulaire**](#le-schéma-modulaire)

<br>

> *Ces fichiers utilisent [@import](https://developer.mozilla.org/en-US/docs/Web/CSS/@import).*

<br>

## Le Schéma Principal

Ce schéma structure le **fichier principal** nommé **style.css**.

Il a pour rôles:

1. **Importer** les styles
2. **Reset** les règles natives
3. **Ajouter** les classes utilitaires

<br>

Exemple de schéma **principal**:

```css
/* #||__[style]__|| */


/* #\_IMPORTS_\ */

    /* __MODULE */
    @import (/* fichier modulaire */);


/* #\_RESET_\ */

    /* __STYLE */
    body { margin: 0; }


/* #\_UTILS_\ */

    /* __SUPER_CLASS */
    .super_text
    {
        color    : crimson;
        font-size: 2.4rem;
    }

    /* __CLASS */
    .d_flx { display: flex; }
```

> *Notez que ce schéma est unique au fichier **style.css** alors le sujet sera toujours **style**.*

<br>

## Le Schéma Modulaire

Un Schéma modulaire a pour rôle de styliser un **composant**\*.

> *Un **composant**\* représente un élément et ses enfants ayant un **comportement** et **style** propre.*<br>
> *Le **comportement** sera géré par le JavaScript quant au **style** il sera structuré dans un fichier CSS par un schéma modulaire.*

Exemple d'un schéma modulaire dans un fichier **nav.css**:

```css
/* #||__[nav]__|| */


/* #\_THIS_\ */

#NAV
{
    width : 70rem;
    height: 6rem;
}

#NAV .nav
{
    background-color: #000;

    color: #FFF;
}
```

> *Notez que `#NAV` en **MAJUSCULE** est facilement identifiable comme id et ne se confond pas avec la classe `.nav`.*

<br>

## **Intégration CSS**

Pour utiliser le CSS, ajout d'une balise `<link>` dans le `<head>`:

```html
<link
rel="stylesheet"
href="[...]/style.css"
type="text/css"
>
```

Cette balise récupère le style **principal** depuis le **style.css**.

<br>

## **Les Sélecteurs**

Dans les fichiers CSS il existe **4 types** de sélecteurs.

## Sommaire

1. [**ID**](#sélecteur-par-id)
2. [**Classe**](#sélecteur-par-classe)
3. [**Classe Utilitaire**](#sélecteur-par-classe-utilitaire)
4. [**Super Classe**](#sélecteur-par-super-classe)

<br>

## Sélecteur par ID

Le sélecteur par **id** cible un composant unique par son identifiant `id`.

```css
#SELECTEUR_PAR_ID { /* ... */ }
```

## Sélecteur par Classe

Le sélecteur de **classe** cible plusieurs composants similaires par leur `class`.

```css
.selecteurParClass { /* ... */ }
```

## Sélecteur par Classe Utilitaire

Les **classes utilitaires** sont des `class` réutilisables comprenant une seule propriété.

```css
.d_flx { display: flex; }
```

> *Ces sélecteurs ont généralement un **nommage très court** avec un caractère faisant référence à la propriété, un underscore `_` et la valeur en abrégé.*<br>
> *Par exemple, **"d"** peut faire référence à **"display"** et **"flx"** à la valeur **"flex"**.*

## Sélecteur par Super Classe

Les **super classes** sont des `class` utilitaires comprenant plus d'une propriété.

```css
.super_class
{
    background-color: #000;

    color: #FFF;
}
```

<br>

# Le JavaScript
<sup>`[js]`</sup>

Un fichier **.js** peut représenter un **élément** / **composant**, un **template**, un **utilitaire**, etc.

> *Ces fichiers utilisent la syntaxe ES6 (voir les [modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)).*

## **Sommaire**

1. [**Intégration**](#intégration-javascript)
2. [**Les Schémas**](#les-schémas-javascript)

<br>

## **Intégration JavaScript**

Pour utiliser le JavaScript dans un projet, ajout d'une balise `<script>` à la fin du `<body>`.

Ce script récupère et appelle la fonction d'initialisation `page_init`\* depuis le **page.js**\*:

```html
 <script>
    {
        const SCRIPT = document.currentScript

        import('[...]/page.js').then(({page_init}) =>
        {
            page_init()

            SCRIPT?.remove()
        })
    }
</script>
```

> *`page_init`\* est la fonction d'initialisation principale.*

> ***page.js**\* est le fichier JavaScript principal.*

> *Chaque page HTML utilisant JavaScript possède un fichier **page.js**.*

<br>

## **Les Schémas javaScript**

Il existe **2 types** de schéma JavaScript:

1. [**Le Schéma Fonctionnel**](#le-schéma-fonctionnel) <sup>`[func]`</sup>
2. [**Le Schéma Objet**](#le-schéma-objet) <sup>`[obj]`</sup>

<br>

## Le Schéma Fonctionnel
<sup>`[func]`</sup>

Le schéma repose sur l'utilisation des `function` pour **manager des fichiers**, pour de l'**utilitaire** et pour manipuler les **variables**, le **DOM**, etc.

> *Cas d'utilisation: **initialisation**, gestion de **schémas objet**, **utilitaire**, etc.*

Il se décompose en **5 sections**:

1. [**Imports**](#1-les-imports)
2. [**Constantes**](#2-les-constantes)
3. [**Variables**](#3-les-variables)
4. [**Fonctions**](#4-les-fonctions)
5. [**Exports**](#5-les-exports)

<br>

Ces sections sont balisées par divers **commentaires**:

```js
/* #||__[subject]__|| */


// #\_IMPORTS_\

    // __ENV

    // __DATA

    // __JS


// #\_CONSTANTES_\

    // __OUTSIDE

    // __THIS

    // __INSIDE


// #\_VARIABLES_\

    // __OUTSIDE

    // __THIS

    // __INSIDE


// #\_FUNCTIONS_\

    // __SET

    // __GET

    // __UPDATES

    // __DESTROY

    // __EVENTS

    // __UTILS


// #\_EXPORTS_\

    // __THIS
```

<br>

### **1. Les Imports**

Import de dépendances par l'utilisation des modules ES6.

> *Voir [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) depuis **developer.mozilla.org**.*

```js
// #\_IMPORTS_\

    // __ENV

        /* Import des variables d'environnement... */

    // __DATA

        /* Import des données... */

    // __JS

        /* Import des scripts... */
```

<br>

### **2. Les Constantes**

Les constantes `const` sont utilisées pour des **informations de configuration**, des **références aux éléments / composants** ou pour les [Objets muables](https://developer.mozilla.org/en-US/docs/Glossary/Mutable).

Les sous-balises précisent la nature des constantes par rapport au **sujet** du fichier:

1. `__OUTSIDE` correspond aux constantes externes. Par exemple un élément parent.
2. `__THIS` correspond aux constantes ayant le même sujet que le fichier.
3. `__INSIDE` correspond aux constantes internes. Par exemple un élément enfant.

<br>

```js
// #\_CONSTANTES_\

    // __OUTSIDE

        /* Constantes externes au sujet */

    // __THIS

        /* Constantes du sujet */

    // __INSIDE

        /* Constantes internes au sujet */
```

Avec un exemple plus concret pour un fichier nommé **nav.js** et faisant référence à une balise `<nav id="NAV">`:

```js
// #\_CONSTANTES_\

    // __OUTSIDE
    const PARENT = document.getElementById('NAV').parentNode // PARENT est un noeud externe au sujet

    // __THIS
    const NAV = document.getElementById('NAV') // NAV fait référence au sujet <nav id="NAV">

    // __INSIDE
    const FIRSTCHILD = NAV?.firstElementChild // FIRSTCHILD est un noeud interne au sujet
```

<br>

### **3. Les Variables**

Les variables `let` sont utilisées pour toutes informations susceptibles de changer comme pour les [Objets immuables](https://developer.mozilla.org/en-US/docs/Glossary/Immutable).

> *Voir [**Les Constantes**](#2-les-constantes) pour comprendre la signification des sous-balises.*

```js
// #\_VARIABLES_\

    // __OUTSIDE

        /* Variables externes au sujet */

    // __THIS

        /* Variables du sujet */

    // __INSIDE

        /* Variables internes au sujet */
```

<br>

### **4. Les Fonctions**

Les fonctions `function` permettent un code maintenable et réutilisable.

Elles se classent en **3 catégories**:

1. **CRUD**\* (Create, Read, Update, Delete)
2. **Événements**
3. **Utilitaires**

<br>

> ***CRUD**\* est décomposé en **4 sous-balises**: `SET` (Create), `GET` (Read), `UPDATES` (Update) et `DESTROY` (Delete).*

```js
// #\_FUNCTIONS_\

    // __SET

        /* Create */

    // __GET

        /* Read */

    // __UPDATES

        /* Update */

    // __DESTROY

        /* Delete */

    // __EVENTS

        /* Callback d'événements */

    // __UTILS

        /* Fonctions utilitaires */
```

La plupart des fonctions sont définies dans le CRUD et suivent cet ordre logique de création `SET`, de lecture `GET`, de modification `UPDATES` et enfin de suppression `DESTROY`. <br>
Ce sont notamment ces fonctions qui vont ajouter et supprimer les événements `EVENTS` par exemple.

<br>

### **5. Les Exports**

Les exports sont toujours lié au sujet du fichier d'où la sous-balise `__THIS`.

> *Voir [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) depuis **developer.mozilla.org**.*

```js
// #\_EXPORTS_\

    // __THIS
```

<br>

## Le Schéma Objet
<sup>`[obj]`</sup>

Le schéma repose sur l'utilisation des `class` pour gérer les **éléments** / **composants**, pour des l'**templates** et pour des **contextes**\*.<br>
Le nom du fichier commence par une **majuscule** (par exemple: **Nav.js**).

> *Les **contextes**\* symbolisent des `class` abstraites et uniques servants à manager une application comme un contexte de gestionnaire d'évènements par exemple.*

Il se décompose en **5 sections**:

1. [**Imports**](#1-les-imports-1)
2. [**Propriétés**](#2-les-propriétés)
3. [**Constructeur**](#3-le-constructeur)
4. [**Méthodes**](#4-les-méthodes)
5. [**Exports**](#5-les-exports-1)

<br>

Ces sections sont balisées par divers **commentaires**:

```js
/* #||__[subject]__|| */


// #\_IMPORTS_\

    // __ENV

    // __DATA

    // __JS


class Subject
{

// #\_PROPS_\

    // __STATICS

    // __PRIVATES

    // __PUBLICS


// #\_CONSTRUCTOR_\

    // __THIS
    constructor () {}


// #\_FUNCTIONS_\

    // __SETTER

    // __GETTER

    // __SET

    // __GET

    // __UPDATES

    // __DESTROY

    // __EVENTS

    // __UTILS


}


// #\_EXPORTS_\

    // __THIS
    export default Subject
```

> *Les mots `subject` et `Subject` sont remplacés par le nom de la `class`.*

<br>

### **1. Les Imports**

> *Voir [**Les Imports**](#1-les-imports) depuis le schéma fonctionnel.*

<br>

### **2. Les Propriétés**

Les propriétés sont l'équivalent des [**constantes & variables**](#2-les-constantes) du schéma fonctionnel.

> *Cas d'utilisation courant: informations de **configuration**, références aux **éléments / composants**, [Objets muables](https://developer.mozilla.org/en-US/docs/Glossary/Mutable).*

Chaque sous-balises `__STATICS`, `__PRIVATES` et `__PUBLICS` précisent la nature des propriétés par rapport au **Sujet** de la `class`.

<br>

```js
class Subject
{
// #\_PROPS_\

    // __STATICS

        /* Propriétés statiques de la class */

    // __PRIVATES

        /* Propriétés privées de la class (utilisation du #) */

    // __PUBLICS

        /* Propriétés publiques de la class */
}
```

Avec un exemple plus concret pour un fichier nommé **Nav.js** et faisant référence à une balise `<nav id="NAV">`:

```js
class Nav
{
// #\_PROPS_\

    // __STATICS
    static __nav_STYLE_CONFIG =
    {
        color     : 'white',
        background: 'black'
    }

    // __PRIVATES
    #nav_ID

    // __PUBLICS
    nav_TEXT_CONTENT = ''

    firstchild
}
```

Dans cet exemple, `__nav_STYLE_CONFIG` sera identique pour chaque instance, `#nav_ID` étant privé ne sera accessible qu'à l'intérieur de la class, à l'inverse `nav_TEXT_CONTENT` et `firstchild` seront accessibles partout.

> *Notez que `firstchild` est un **sujet** différent de `Nav` car ici c'est une propriété faisant référence à un élément interne.*<br>
> *Aucune différence n'est faite entre les propriétés externes, égales et internes pour éviter de surcharger la section de sous-balises.*<br>
> *Alors, pour garder une bonne reconnaissance des sujets, le nommage des propriétés est identique à celui des variables.*

<br>

### **3. Le Constructeur**

Le constructeur initialise une nouvelle instance de `class`.

En général, il fera appel à une fonction générique `SET` comme `sujet_set` par exemple pour instancier l'Objet.

```js
class Subject
{
// #\_CONSTRUCTOR_\

    // __THIS
    constructor () { /* initialisation */ }
}
```

> *À noter que le **constructeur** n'est pas toujours présent.*

<br>

### **4. Les Méthodes**

Les **méthodes** permettent un code maintenable et réutilisable dans un Objet.

Elles se classent en **4 catégories**:

1. **Accesseurs**\*
2. **CRUD** (Create, Read, Update, Delete)
3. **Événements**
4. **Utilitaires**

<br>

> *Les **Accesseurs**\* `set` et `get` gèrent et contrôlent les propriétés de l'Objet depuis les sous-balises `__SETTER` et `__GETTER`.*

> *Voir la section sur [**Les Fonctions**](#4-les-fonctions) depuis le schéma fonctionnel pour plus d'informations sur les méthodes **CRUD**, **événements** et **utilitaires**.*

```js
class Subject
{
// #\_FUNCTIONS_\

    // __SETTER

        /* set props */

    // __GETTER

        /* get props */

    // __SET

        /* Create */

    // __GET

        /* Read */

    // __UPDATES

        /* Update */

    // __DESTROY

        /* Delete */

    // __EVENTS

        /* Callback d'événements */

    // __UTILS

        /* Fonctions utilitaires */
}
```

<br>

### **5. Les Exports**

> *Voir [**Les Exports**](#1-les-exports) depuis le schéma fonctionnel.*

<br>

# Résumé

Ajout d'une nouvelle méthode de programmation nommé [**Subject Programming**](#le-subject-programming).<br>
Cette méthode est associée à 2 nouvelles syntaxes de nommage: le [**Subject Screaming Snake Case**](#le-subject-screaming-snake-case) et le [**Subject Camel Case**](#le-subject-camel-case).

Le CSS est ajouté au HTML via une seule balise `<link>` pointant vers le **style.css**.<br>
Quant au JavaScript il est intégré par une balise `<script>` important un fichier d'initialisation nommé **page.js** et sa fonction `page_init`.

Le fichier **style.css** utilise le [**Schéma Principal**](#le-schéma-principal) pour **importer**, **réinitialiser les styles** et ajouter les **classes utilitaires**.<br>
Le [**Schéma Modulaire**](#le-schéma-modulaire) est utilisé pour styliser un composant du DOM.

Chaque fichier JavaScript respecte un schéma de construction parmi le [**Schéma Fonctionnel**](#i-le-schéma-fonctionnel) et le [**Schéma Objet**](#ii-schéma-objet).<br>
Les schémas fonctionnels sont généralement utilisés pour l'**initialisation**, le **management d'Objet** et l'**utilitaire**.<br>
Tandis que, les schémas objets se concentrent sur des **éléments** / **composants**, des **templates** ou des **contextes** d'application.