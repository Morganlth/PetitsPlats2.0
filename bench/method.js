recipes_resetVars()

recipes_CURRENT_WORDS.forEach(word =>
{
    const MATCH = Recipe.__recipe_TREE.tree_match(word)
    
    if (!MATCH) return

    recipes_CURRENT_RECIPES.forEach(recipe => { if (!MATCH.has(recipe)) recipes_CURRENT_RECIPES.delete(recipe)} )
})