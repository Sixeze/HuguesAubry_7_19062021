import { displayRecipes } from "./recipeCards.js";

export function recipeFilter(inputValue, filteredRecipes) {
  let word = inputValue.toLowerCase();
  console.log(filteredRecipes);
  filteredRecipes = filteredRecipes.filter((recipe) => {
    return (
      recipe.description.toLowerCase().includes(word) ||
      recipe.name.toLowerCase().includes(word) ||
      recipe.ingredients
        .map((ingredient) => ingredient.ingredient)
        .join("")
        .toLowerCase()
        .includes(word) ||
      recipe.ustensils
        .map((ustensil) => ustensil)
        .join("")
        .toLowerCase()
        .includes(word) ||
      recipe.appliance.toLowerCase().includes(word)
    );
  });
  console.log(filteredRecipes);
  displayRecipes(filteredRecipes);
}

//search bar a modifier pour algo-2
