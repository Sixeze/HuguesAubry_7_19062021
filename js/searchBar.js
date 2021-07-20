import { displayRecipes } from "./recipeCards.js";
import { recipes } from "./recipes.js";

export let allRecipes = recipes;
export let filteredRecipes = [...allRecipes];

export function recipeFilter(word) {
  console.log("tableau avant appel fonction : ", filteredRecipes);

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

  console.log("tableau dans la fonction : ", filteredRecipes);
  displayRecipes(filteredRecipes);
}

//search bar a modifier pour algo-2

export function displayAllRecipes() {
  filteredRecipes = allRecipes;
  displayRecipes(filteredRecipes);
}
