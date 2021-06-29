import { displayRecipes } from "./recipeCards.js";
import { recipeFilter } from "./searchBar.js";
import { recipes } from "./recipes.js";

// import { recipeClass } from "./recipesClass.js";

const allRecipes = recipes;
let newRecipes = [];
const selectedIngredients = [];
const selectedAppliance = [];
const selectedUstensils = [];

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
const mainDisplayRecipes = document.querySelector("#displayRecipes");
// console.log(searchBar);

// DOM elements for tagBox
const tagBoxContainer = document.querySelector("#tagBoxContainer");

// DOM elements for ingredients
const ingredientInput = document.querySelector("#ingredients");

// DOM elements for appliances
const applianceInput = document.querySelector("#appliances");

// DOM elements for ustensils
const ustensilInput = document.querySelector("#ustensils");
const datalistIngredients = document.querySelector("#ingredientsList");
const datalistAppliances = document.querySelector("#appliancesList");
const datalistUstensils = document.querySelector("#ustensilsList");

// all input search

ingredientInput.addEventListener("input", (e) => {
  onInput(e, selectedIngredients);
  updateUlTags(selectedIngredients, "bg-primary", ingredientInput);
});

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliance);
  updateUlTags(selectedAppliance, "bg-success", applianceInput);
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensils);
  updateUlTags(selectedUstensils, "bg-danger", ustensilInput);
});

function updateUlTags(selectedElts, color, input) {
  selectedElts.forEach((elt) => {
    console.log(selectedElts);
    tagBoxContainer.innerHTML += `<button type="button" class="btn ${color} text-white mx-1">
                                    ${elt} <img src="img/close.svg" alt="close" class="mx-1">
                                  </button>`;
    input.value = "";
    displayRecipes(newRecipes);
    // recipesWithIngredientSelected(elt, newRecipes);

    let tagBtn = document.querySelectorAll(".btn");
    tagBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        selectedElts.splice(selectedElts.indexOf(elt), 1);

        // btn.style.display = "none";
        tagBoxContainer.removeChild(btn);
        if (tagBoxContainer.innerHTML === "") {
          displayRecipes(allRecipes);
        }
      })
    );
  });
}

//function for comboBox
function onInput(e, selectedElts) {
  let input = e.target;
  let inputValue = input.value.toLowerCase();
  let list = input.getAttribute("list");
  let options = document.getElementById(list).childNodes;
  newRecipes = [];
  options.forEach((option) => {
    let optVal = option.value.toLowerCase();
    if (optVal === inputValue) {
      if (selectedElts.includes(optVal)) {
        selectedElts = selectedElts.filter((item) => item != optVal);
      } else {
        selectedElts.push(optVal);
      }
      recipesWithIngredientSelected(optVal, allRecipes);
      recipesWithApplianceSelected(optVal, allRecipes);
      recipesWithUstensilSelected(optVal, allRecipes);
      displayRecipes(newRecipes);
    }
  });
}

function recipesWithIngredientSelected(elementSelected, arrayRecipe) {
  // console.log(newRecipes);
  arrayRecipe.forEach((recipe) => {
    recipe.ingredients.forEach((i) => {
      let ingredient = i.ingredient;
      if (ingredient.toLowerCase().indexOf(elementSelected) === -1) {
        return false;
      } else {
        newRecipes.push(recipe);
        // console.log(newRecipes);
        return true;
      }
    });
  });
}

function recipesWithApplianceSelected(elementSelected, arrayRecipe) {
  arrayRecipe.forEach((recipe) => {
    if (recipe.appliance.toLowerCase().indexOf(elementSelected) === -1) {
      return false;
    } else {
      newRecipes.push(recipe);
      return true;
    } //else
  });
}

function recipesWithUstensilSelected(elementSelected, arrayRecipe) {
  arrayRecipe.forEach((recipe) => {
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
searchBar.addEventListener("input", (e) => {
  let inputValue = e.target.value;
  if (inputValue.length > 2) {
    mainDisplayRecipes.innerHTML = "";
    newRecipes = [];
    recipeFilter(inputValue, allRecipes, newRecipes);
    displayRecipes(newRecipes);
  }
  if (inputValue.length <= 2) {
    displayRecipes(allRecipes);
  }
});

// show Recipe open Page
displayRecipes(allRecipes);
