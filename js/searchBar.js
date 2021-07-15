export function recipeFilter(value, allRecipes, filteredRecipes) {
  console.time("recipeFilter");
  let word = value.toLowerCase();
  console.log(word);

  console.log(allRecipes);
  filteredRecipes = [];
  console.log(filteredRecipes);
  filteredRecipes = allRecipes.filter((recipe) => {
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
  console.timeEnd("recipeFilter");
}

//search bar a modifier pour algo-2
