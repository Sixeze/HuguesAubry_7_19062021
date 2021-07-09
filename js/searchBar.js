export function recipeFilter(value, array, newRecipes) {
  console.time("recipeFilter");
  let word = value.toLowerCase();
  // console.log(word);
  for (let recipe of array) {
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
      newRecipes.push(recipe);
    }
  }
  console.timeEnd("recipeFilter");
}

// console.log(newRecipes);
// console.log("listOfIngredients :", listOfIngredients);
// console.log("listOfUstensils :", listOfIngredients);
