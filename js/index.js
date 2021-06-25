import { recipeClass } from "./recipesClass.js";
import { recipes } from "./recipes.js";

const allRecipes = recipes;
let newRecipes = [];
const selectedIngredient = [];
const selectedAppliance = [];
const selectedUstensils = [];

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
// console.log(searchBar);

const mainDisplayRecipes = document.querySelector("#displayRecipes");

// DOM elements for tagBox
const tagBoxContainer = document.querySelector("#tagBoxContainer");

// DOM elements for ingredients
const ingredientInput = document.querySelector("#ingredients");
const datalistIngredients = document.querySelector("#ingredientsList");

// DOM elements for appliances
const applianceInput = document.querySelector("#appliances");
const datalistAppliances = document.querySelector("#appliancesList");

// DOM elements for ustensils
const ustensilInput = document.querySelector("#ustensils");
const datalistUstensils = document.querySelector("#ustensilsList");

// all input search
searchBar.addEventListener("input", filterCardElements);

ingredientInput.addEventListener("input", (e) => {
  onInput(e);
  createTagElt(datalistIngredients, ingredientInput, selectedIngredient);
  console.log(datalistIngredients);
  updateUlTags(selectedIngredient, "bg-primary");

  ingredientInput.value = "";
});

applianceInput.addEventListener("input", (e) => {
  onInput(e);
  createTagElt(datalistAppliances, applianceInput, selectedAppliance);

  updateUlTags(selectedAppliance, "bg-success");
  applianceInput.value = "";
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e);
  createTagElt(datalistUstensils, ustensilInput, selectedUstensils);

  updateUlTags(selectedUstensils, "bg-danger");
  ustensilInput.value = "";
});

function createTagElt(datalist, input, selectedElts) {
  let optionValue = [...datalist.options]
    .map((o) => o.value)
    .indexOf(input.value);
  let tagSelected = datalist.options[optionValue].value;

  tagBoxContainer.innerHTML = "";
  if (optionValue === -1) {
    return false;
  } else {
    selectedElts.push(tagSelected);
  }
}

function updateUlTags(selectedElts, color) {
  selectedElts.forEach(
    (elt) =>
      (tagBoxContainer.innerHTML += `<button  class="btn ${color} col-1 text-center">${elt} X </button>`)
  );
}

//function for comboBox
function onInput(e) {
  let input = e.target;
  let val = input.value.toLowerCase();
  let list = input.getAttribute("list");
  let options = document.getElementById(list).childNodes;
  newRecipes = [];
  options.forEach((option) => {
    let optVal = option.value.toLowerCase();
    if (optVal === val) {
      console.log(optVal);

      recipesWithIngredientSelected(optVal);
      recipesWithApplianceSelected(optVal);
      recipesWithUstensilSelected(optVal);

      displayRecipes(newRecipes);
      displayComboBox(newRecipes);
    }
  });
}

function recipesWithIngredientSelected(elementSelected) {
  allRecipes.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient;
      if (ingredient.toLowerCase().indexOf(elementSelected) === -1) {
        return false;
      } else {
        newRecipes.push(recipe);
        return true;
      }
    });
  });
}

function recipesWithApplianceSelected(elementSelected) {
  allRecipes.forEach((recipe) => {
    if (recipe.appliance.toLowerCase().indexOf(elementSelected) === -1) {
      return false;
    } else {
      newRecipes.push(recipe);
      return true;
    } //else
  });
}

function recipesWithUstensilSelected(elementSelected) {
  allRecipes.forEach((recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      if (ustensil.toLowerCase().indexOf(elementSelected) === -1) {
        return false;
      } else {
        newRecipes.push(recipe);
        return true;
      }
    });
  });
}

//function for Search Bar
function filterCardElements(e) {
  let inputValue = e.target.value;
  if (inputValue.length > 2) {
    mainDisplayRecipes.innerHTML = "";
    displayRecipes();
  }
  if (inputValue.length <= 2) {
    displayRecipes(allRecipesObjElts);
  } else {
    mainDisplayRecipes.innerHTML =
      "<h2>il n'y a pas de recettes avec vos critère de recherche</h2>";
  }
}

// call to line :
function displayRecipes(arrayRecipe) {
  while (mainDisplayRecipes.firstChild) {
    mainDisplayRecipes.removeChild(mainDisplayRecipes.firstChild);
  }
  mainDisplayRecipes.innerHTML = "";
  arrayRecipe.forEach((recipe) => {
    const articleRecipes = document.createElement("article");
    articleRecipes.classList.add(
      "card",
      "col-md-6",
      "col-xl-4",
      "mb-4",
      "border",
      "border-danger"
    );
    articleRecipes.innerHTML = `<img class="card-img-top bg-color" src="" alt="" width="auto" height="200px">
                                <div class="card-body border border-dark g-0">
                                    <div class="row">
                                    <h5 class="col-9 card-title g-0">${
                                      recipe.name
                                    }</h5>
                                    <p class="col-3 g-0">🕒 ${
                                      recipe.time
                                    }min</p>
                                    </div>
                                    <div class="row">
                                    <p class="col-6 g-0 card-text fw-bold">${recipe.ingredients
                                      .map(
                                        (ingredient) =>
                                          ingredient.ingredient +
                                          (ingredient?.quantity
                                            ? ": " + ingredient.quantity
                                            : "") +
                                          " " +
                                          (ingredient.unit || "")
                                      )
                                      .join("</br>")}</p>
                                    <p class="col-6 card-text textDescription">${
                                      recipe.description
                                    }</p>
                                    </div>
                                </div>`;
    mainDisplayRecipes.appendChild(articleRecipes);
  });

  displayComboBox(allRecipes);
}

// call to line :
function displayComboBox(array) {
  datalistIngredients.innerHTML = "";
  datalistAppliances.innerHTML = "";
  datalistUstensils.innerHTML = "";

  const allIngredients = [
    ...new Set(
      array
        .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
        .sort()
    ),
  ];
  const allAppliances = [
    ...new Set(array.flatMap((recipe) => recipe.appliance).sort()),
  ];

  const allUstensils = [
    ...new Set(array.flatMap((recipe) => recipe.ustensils).sort()),
  ];

  allIngredients.forEach((ingredient) => {
    datalistIngredients.innerHTML += `<option value="${ingredient}"${ingredient}</option>`;
  });

  allAppliances.forEach((appliance) => {
    datalistAppliances.innerHTML += `<option value="${appliance}"${appliance}</option>`;
  });

  allUstensils.forEach((ustensil) => {
    datalistUstensils.innerHTML += `<option value="${ustensil}"${ustensil}</option>`;
  });
}

// show Recipe open Page
displayRecipes(allRecipes);

// const newRecipeObjectList = classOfRecipe.createNewRecipeList();
// console.log(newRecipeObjectList);
