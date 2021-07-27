import { allRecipes } from "./searchBar.js";
import { displayAllRecipes } from "./searchBar.js";
import { displayRecipes } from "./recipeCards.js";
import { filteredRecipes } from "./searchBar.js";
import { recipeFilter } from "./searchBar.js";
import { recipesFilterForSuppValue } from "./searchBar.js";

let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];
let arrayForInputValue = [];
let arrayforAllTag = [
  selectedIngredients,
  selectedAppliances,
  selectedUstensils,
];

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

  if (inputValue.length > 2) {
    mainDisplayRecipes.innerHTML = "";
    recipeFilter(inputValue);
    // console.log("tableau apres appel fonction : ", filteredRecipes);
    arrayForInputValue.push(inputValue);
    console.log(arrayForInputValue);

    for (let a = 0; a < arrayForInputValue.length; a++) {
      if (arrayForInputValue[a] < arrayForInputValue[a - 1]) {
        recipesFilterForSuppValue(inputValue);
      }
    }
  }
  if (inputValue.length <= 2 && tagBoxContainer.innerHTML == "") {
    displayAllRecipes();
    arrayForInputValue = [];
    console.log("search et tagbox = rien ");
  }
});

/**
 * addEventlistener for inputs combobox
 */
ingredientInput.addEventListener("input", (e) => {
  onInput(e, selectedIngredients);
  displayTagElement();
  closeTag();
});

applianceInput.addEventListener("input", (e) => {
  onInput(e, selectedAppliances);
  displayTagElement();
  closeTag();
});

ustensilInput.addEventListener("input", (e) => {
  onInput(e, selectedUstensils);
  displayTagElement();
  closeTag();
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
  tagBoxContainer.innerHTML = "";
  arrayforAllTag = [selectedIngredients, selectedAppliances, selectedUstensils];
  for (let i = 0; i < arrayforAllTag.length; i++) {
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
      let tag = arrayforAllTag[i][j];

      tagBoxContainer.innerHTML += `<button type="button" value="${tag}" class="btn ${color}  text-white mx-1">
                                     ${tag} <img src="img/close.svg" alt="close" class="mx-1">
                                     </button>`;

      recipeFilter(tag);
    }
  }
}

/**
 *
 */
function closeTag() {
  if (searchBar.value != "") {
    arrayforAllTag = [
      selectedIngredients,
      selectedAppliances,
      selectedUstensils,
      [searchBar.value],
    ];
  } else {
    arrayforAllTag;
  }
  console.log("arrayforAllTag", arrayforAllTag);

  let tagBtn = document.querySelectorAll(".btn");
  tagBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let word = e.target.value;
      console.log(btn, e.target.value);

      for (let i = 0; i < arrayforAllTag.length; i++) {
        console.log("i =", i, "arrayforAllTag[i] = ", arrayforAllTag[i]);
        let index = arrayforAllTag[i].indexOf(word);
        console.log(index);
        if (index > -1) {
          arrayforAllTag[i].splice(index, 1);
        }
        console.log(arrayforAllTag);
        btn.remove();
        for (let j = 0; j < arrayforAllTag[i].length; j++) {
          let Tag = arrayforAllTag[i][j];
          recipesFilterForSuppValue(Tag);
        }
      }

      if (searchBar.value <= 2 && tagBoxContainer.innerHTML === "") {
        displayAllRecipes();
        selectedIngredients = [];
        selectedAppliances = [];
        selectedUstensils = [];
      }
      // if (searchBar.value != "" && tagBoxContainer.innerHTML === "") {
      //   recipesFilterForSuppValue(searchBar.value);
      //   selectedIngredients = [];
      //   selectedAppliances = [];
      //   selectedUstensils = [];
      // }
    });
  });
}

// show Recipe open Page
displayRecipes(filteredRecipes);
