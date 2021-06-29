export function recipeFilter(value, array, newRecipes) {
  let word = value.toLowerCase();
  console.log(word);
  for (let recipe of array) {
    let match = true;
    if (
      !recipe.description.toLowerCase().includes(word) &&
      !recipe.name.toLowerCase().includes(word)
    ) {
      match = false;
    }

    if (match) {
      newRecipes.push(recipe);
    }
  }
}
