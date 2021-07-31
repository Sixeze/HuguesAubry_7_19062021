/**
 * @param {object array} arrayOfRecipes array for displaying recipe
 */
export function displayComboBox(arrayOfRecipes) {
  const datalistIngredients = document.querySelector("#ingredientsList");
  const datalistAppliances = document.querySelector("#appliancesList");
  const datalistUstensils = document.querySelector("#ustensilsList");

  datalistIngredients.innerHTML = "";
  datalistAppliances.innerHTML = "";
  datalistUstensils.innerHTML = "";

  let ingredientsArray = [
    ...new Set(
      arrayOfRecipes
        .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
        .sort()
    ),
  ];

  let appliancesArray = [
    ...new Set(arrayOfRecipes.flatMap((recipe) => recipe.appliance).sort()),
  ];

  let ustensilsArray = [
    ...new Set(arrayOfRecipes.flatMap((recipe) => recipe.ustensils).sort()),
  ];

  ingredientsArray.forEach((ingredient) => {
    datalistIngredients.innerHTML += `<option value="${ingredient}"${ingredient}</option>`;
  });

  appliancesArray.forEach((appliance) => {
    datalistAppliances.innerHTML += `<option value="${appliance}"${appliance}</option>`;
  });

  ustensilsArray.forEach((ustensil) => {
    datalistUstensils.innerHTML += `<option value="${ustensil}"${ustensil}</option>`;
  });
}
