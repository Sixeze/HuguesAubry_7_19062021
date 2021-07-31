export function recipeFilter(value, allRecipes, filteredRecipes) {
  let word = value.toLowerCase();

  for (let recipe of allRecipes) {
    let match = true;
    let listOfIngredients = [];
    let listOfUstensils = [];

    for (let i of recipe.ingredients) {
      listOfIngredients.push(i.ingredient.toLowerCase());
    }

    for (let ustensil of recipe.ustensils) {
      listOfUstensils.push(ustensil.toLowerCase());
    }
    if (
      !recipe.description.toLowerCase().includes(word) &&
      !recipe.name.toLowerCase().includes(word) &&
      !listOfIngredients.join(" ").includes(word) &&
      !listOfUstensils.join(" ").includes(word)
    ) {
      match = false;
    }

    if (match) {
      filteredRecipes.push(recipe);
    }
  }
}
