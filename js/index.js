import { allRecipes } from "./searchBar.js";
import { displayAllRecipes } from "./searchBar.js";
import { displayRecipes } from "./recipeCards.js";
import { filteredRecipes } from "./searchBar.js";
import { recipeFilter } from "./searchBar.js";
import { recipesFilterForSuppValue } from "./searchBar.js";

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
    console.log("input > 2", arrayforAllTag, filteredRecipes.length);

    if (inputValue < valueOfSearchBar) {
      recipesFilterForSuppValue(inputValue);
      console.log("backSpace", arrayforAllTag, filteredRecipes.length);
    }
    valueOfSearchBar = inputValue;
  }
  if (inputValue.length <= 2) {
    arrayforAllTag;
    if (tagBoxContainer.innerHTML == "") {
      displayAllRecipes();
      console.log("if <2 tagBox vierge", filteredRecipes.length);
    }
    if (tagBoxContainer.innerHTML !== "") {
      console.log(
        "if <2 tagBox!vierge",
        arrayforAllTag,
        filteredRecipes.length
      );
      for (let i = 0; i < tagBoxContainer.childNodes.length; i++) {
        let eltsValue = tagBoxContainer.childNodes[i];
        recipesFilterForSuppValue(eltsValue.value);
      }
    }
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
      console.log("display Tag", arrayforAllTag, filteredRecipes.length);
    }
  }
}

/**
 * function for close tag element
 */
function closeTag() {
  if (searchBar.value != "") {
    arrayforAllTag = arrayforAllTag = [
      selectedIngredients,
      selectedAppliances,
      selectedUstensils,
      [searchBar.value],
    ];
    console.log(
      "closeTag arrayforAllTag[4]",
      arrayforAllTag,
      filteredRecipes.length
    );
  } else {
    arrayforAllTag;
    console.log(
      "closeTag arrayforAllTag[3]",
      arrayforAllTag,
      filteredRecipes.length
    );
  }

  let tagBtn = document.querySelectorAll(".btn");
  tagBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let word = e.target.value;

      for (let i = 0; i < arrayforAllTag.length; i++) {
        // console.log("i =", i, "arrayforAllTag[i] = ", arrayforAllTag[i]);
        let index = arrayforAllTag[i].indexOf(word);

        if (index > -1) {
          arrayforAllTag[i].splice(index, 1);
        }

        for (let j = 0; j < arrayforAllTag[i].length; j++) {
          let Tag = arrayforAllTag[i][j];
          recipesFilterForSuppValue(Tag);
        }
        btn.remove();
      }

      if (searchBar.value <= 2 && tagBoxContainer.innerHTML === "") {
        displayAllRecipes();
        selectedIngredients = [];
        selectedAppliances = [];
        selectedUstensils = [];
      }
      console.log("arrayforAllTag[x]", arrayforAllTag, filteredRecipes.length);
    });
  });
}

// show Recipe open Page
displayRecipes(filteredRecipes);
