import { allRecipes } from "./searchBar.js";
import { displayAllRecipes } from "./searchBar.js";
import { displayRecipes } from "./recipeCards.js";
import { filteredRecipes } from "./searchBar.js";
import { recipeFilter } from "./searchBar.js";

// import { recipes } from "./recipes.js";

// import { recipeClass } from "./recipesClass.js";

// const allRecipes = recipes;
// let filteredRecipes = [...allRecipes];
let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
const mainDisplayRecipes = document.querySelector("#displayRecipes");
const tagBoxContainer = document.querySelector("#tagBoxContainer");

// DOM elements for ingredients
const ingredientInput = document.querySelector("#ingredients");
const applianceInput = document.querySelector("#appliances");
const ustensilInput = document.querySelector("#ustensils");

/**
 * addEventlistener for input searchBar
 */
searchBar.addEventListener("input", (e) => {
  let inputValue = e.target.value.toLowerCase();
  console.log(inputValue.length);
  console.log(inputValue.length - 1);
  // console.log(searchBar.value);
  if (inputValue.length - 1 < inputValue.length) {
    console.log("polp");
  }

  if (inputValue.length > 2) {
    mainDisplayRecipes.innerHTML = "";
    // filterRecipe(inputValue);
    recipeFilter(inputValue);

    console.log("tableau apres appel fonction : ", filteredRecipes);
    // displayRecipes(filteredRecipes);
  }
  if (inputValue.length <= 2 && tagBoxContainer.innerHTML === "") {
    displayAllRecipes();
  }
});

/**
 * addEventlistener for inputs combobox
 */
ingredientInput.addEventListener("input", (e) => {
  onInput(e, selectedIngredients);
  displayTagElement();
});

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliances);
  displayTagElement();
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensils);
  displayTagElement();
});

/**
 *
 * @param {*} e event to input.value
 * @param {*} arrayForTag array for ingredient/appliance/ustensils
 */
function onInput(e, arrayForTag) {
  let input = e.target;
  let inputTag = input.value.toLowerCase();
  if (inputTag.length >= 3) {
    arrayForTag.push(inputTag);
    input.value = "";
  }
}

/**
 * function for display tag
 */
function displayTagElement() {
  // console.log("arrayforAllTag :", arrayforAllTag);
  tagBoxContainer.innerHTML = "";
  const arrayforAllTag = [
    selectedIngredients,
    selectedAppliances,
    selectedUstensils,
  ];
  for (let i = 0; i < arrayforAllTag.length; i++) {
    // console.log("i =", i, "arrayforAllTag[i] = ", arrayforAllTag[i]);
    let color;
    if (i === 0) {
      color = "btn-primary";
    }
    if (i === 1) {
      color = "btn-success";
    }
    if (i === 2) {
      color = "btn-danger";
    }
    for (let j = 0; j < arrayforAllTag[i].length; j++) {
      // console.log("i = ", i, "j = ", arrayforAllTag[i][j], j);
      let tag = arrayforAllTag[i][j];

      tagBoxContainer.innerHTML += `<button type="button" value="${tag}" class="btn ${color}  text-white mx-1">
                                     ${tag} <img src="img/close.svg" alt="close" class="mx-1">
                                     </button>`;

      recipeFilter(tag);
      // filterRecipe(tag);
    }
    closeTag(arrayforAllTag[i]);
  }
}

/**
 *
 * @param {object array} array
 */
function closeTag(array) {
  console.log(array);
  let tagBtn = document.querySelectorAll(".btn");
  tagBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let word = e.target.value;
      // console.log(word);
      const index = array.indexOf(word);
      // console.log(index);
      if (index > -1) {
        array.splice(index, 1);
      }
      console.log(array.length);

      btn.remove();

      array.forEach((tag) => {
        console.log("log du tag a la supp :", tag);
        filteredRecipes = allRecipes;
        recipeFilter(tag);
      });

      if (tagBoxContainer.innerHTML === "") {
        (selectedIngredients = []),
          (selectedAppliances = []),
          (selectedUstensils = []);

        if (searchBar.value === "") {
          displayAllRecipes();
        }
      }
    });
  });
}

// /**
//  *
//  * @param {element array} tag
//  */
// function filterRecipe(tag) {
//   console.log("avant la selection du tag", filteredRecipes);
//   filteredRecipes = filteredRecipes.filter((recipe) => {
//     return (
//       recipe.description.toLowerCase().includes(tag) ||
//       recipe.name.toLowerCase().includes(tag) ||
//       recipe.ingredients
//         .map((ingredient) => ingredient.ingredient)
//         .join("")
//         .toLowerCase()
//         .includes(tag) ||
//       recipe.ustensils
//         .map((ustensil) => ustensil)
//         .join("")
//         .toLowerCase()
//         .includes(tag) ||
//       recipe.appliance.toLowerCase().includes(tag)
//     );
//   });
//   console.log("apres la selection du tag", filteredRecipes);
//   displayRecipes(filteredRecipes);
// }

// show Recipe open Page
displayRecipes(filteredRecipes);
