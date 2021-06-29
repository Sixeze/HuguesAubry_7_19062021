export function displayComboBox(array) {
  let datalistIngredients = document.querySelector("#ingredientsList");
  let datalistAppliances = document.querySelector("#appliancesList");
  let datalistUstensils = document.querySelector("#ustensilsList");

  datalistIngredients.innerHTML = "";
  datalistAppliances.innerHTML = "";
  datalistUstensils.innerHTML = "";

  const ingredientsArray = [
    ...new Set(
      array
        .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
        .sort()
    ),
  ];

  const appliancesArray = [
    ...new Set(array.flatMap((recipe) => recipe.appliance).sort()),
  ];

  const ustensilsArray = [
    ...new Set(array.flatMap((recipe) => recipe.ustensils).sort()),
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

  console.log(ingredientsArray);
  console.log(appliancesArray);
  console.log(ustensilsArray);
}
