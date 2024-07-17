recipes_resetVars()

for (const WORD of recipes_CURRENT_WORDS)
{
    const MATCH = Recipe.__recipe_TREE.tree_match(WORD)
    
    if (!MATCH) return

    for (const RECIPE of recipes_CURRENT_RECIPES) if (!MATCH.has(RECIPE)) recipes_CURRENT_RECIPES.delete(RECIPE)
}