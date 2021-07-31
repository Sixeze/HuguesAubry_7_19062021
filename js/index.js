import { allRecipesToFiltered } from "./searchBar.js";
import { displayAllRecipes } from "./searchBar.js";
import { displayRecipes } from "./recipeCards.js";
import { filteredRecipes } from "./searchBar.js";
import { recipeFilter } from "./searchBar.js";

let selectedIngredients = [];
let selectedAppliances = [];
let selectedUstensils = [];
let arrayforAllTag = [
  selectedIngredients,
  selectedAppliances,
  selectedUstensils,
];
let valueOfSearchBar = "";

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
const tagBoxContainer = document.querySelector("#tagBoxContainer");
const mainDisplayRecipes = document.querySelector("#displayRecipes");

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

    tagAndSearchBarValue();

    if (inputValue < valueOfSearchBar) {
      allRecipesToFiltered();
      recipeFilter(inputValue);
      if (tagBoxContainer.innerHTML !== "") {
        for (let i = 0; i < tagBoxContainer.childNodes.length; i++) {
          let eltsValue = tagBoxContainer.childNodes[i];
          recipeFilter(eltsValue.value);
        }
      }
    }
    valueOfSearchBar = inputValue;
  }
  ifSearchMethod(inputValue.length);
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
 * @param {string} e event to input.value
 * @param {array*} arrayForTag array for ingredient/appliance/ustensils
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
  justTagInArray();

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
                                     ${tag} <img src="img/close.svg" alt="close" class="close mx-1">
                                     </button>`;

      recipeFilter(tag);
    }
  }
}

/**
 * function for close tag element
 */
function closeTag() {
  if (searchBar.value != "") {
    tagAndSearchBarValue();
  } else {
    justTagInArray();
  }

  let tagBtn = document.querySelectorAll(".btn");
  tagBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let word = e.target.value;
      allRecipesToFiltered();

      for (let i = 0; i < arrayforAllTag.length; i++) {
        let index = arrayforAllTag[i].indexOf(word);

        if (index > -1) {
          arrayforAllTag[i].splice(index, 1);
        }

        for (let j = 0; j < arrayforAllTag[i].length; j++) {
          let tag = arrayforAllTag[i][j];

          recipeFilter(tag);
        }
        btn.remove();
      }
      ifSearchMethod(searchBar.value);
    });
  });
}

/**
 *
 * @param {input value} searchBarValue
 */
function ifSearchMethod(searchBarValue) {
  if (searchBarValue <= 2) {
    justTagInArray();
    if (tagBoxContainer.innerHTML == "") {
      displayAllRecipes();
      selectedIngredients = [];
      selectedAppliances = [];
      selectedUstensils = [];
    }
    if (tagBoxContainer.innerHTML !== "") {
      allRecipesToFiltered();
      for (let i = 0; i < tagBoxContainer.childNodes.length; i++) {
        let eltsValue = tagBoxContainer.childNodes[i];
        recipeFilter(eltsValue.value);
      }
    }
  }
}

function justTagInArray() {
  arrayforAllTag = [selectedIngredients, selectedAppliances, selectedUstensils];
}

function tagAndSearchBarValue() {
  arrayforAllTag = [
    selectedIngredients,
    selectedAppliances,
    selectedUstensils,
    [searchBar.value],
  ];
}

// show Recipe open Page
displayRecipes(filteredRecipes);
