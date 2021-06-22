import { recipeClass } from "./recipesClass.js";

const classOfRecipe = new recipeClass();
console.log(classOfRecipe);

// DOM elements for index
const searchBar = document.querySelector(".inputSearchBar");
console.log(searchBar);
const tagBoxContainer = document.querySelector(".tagBoxContainer");
const mainDisplayRecipes = document.querySelector("#displayRecipes");

// DOM elements for ingredients
const ingredientInput = document.querySelector("#ingredients");
const datalistIngredients = document.querySelector("#ingredientsList");

// DOM elements for appliances
const applianceInput = document.querySelector("#appliances");
const datalistAppliances = document.querySelector("#appliancesList");

// DOM elements for ustensils
const ustensilInput = document.querySelector("#ustensils");
const datalistUstensils = document.querySelector("#ustensilsList");

function displayComboBox() {
  const ingredientsList = classOfRecipe.createAllIngredientsList();
  const appliancesList = classOfRecipe.createAllAppliancesList();
  const ustensilsList = classOfRecipe.createAllUstensilsList();

  datalistIngredients.innerHTML = "";
  datalistAppliances.innerHTML = "";
  datalistUstensils.innerHTML = "";

  ingredientsList.forEach((ingredient) => {
    datalistIngredients.innerHTML += `<option value="${ingredient}"${ingredient}</option>`;
  });

  appliancesList.forEach((appliance) => {
    datalistAppliances.innerHTML += `<option value="${appliance}"${appliance}</option>`;
  });

  ustensilsList.forEach((ustensil) => {
    datalistUstensils.innerHTML += `<option value="${ustensil}"${ustensil}</option>`;
  });
}

function displayRecipes() {
  const recipesObjectElements = classOfRecipe.createAllRecipeList();
  recipesObjectElements.forEach((recipe) => {
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

  {
    /* <article class="card col-md-4 mb-4 border border-danger">
  <img
    class="card-img-top bg-color"
    src=""
    alt=""
    width="auto"
    height="150px"
  ></img>
  <div class="card-body">
    <div class="row no-gutters">
      <h5 class=""></h5>
      <h5 class=""></h5>
    </div>
    <div class="row">
      <p class=""></p>
      <p class=""></p>
    </div>
  </div>
</article>; */
  }

  displayComboBox();
}

displayRecipes();

// const newRecipeObjectList = classOfRecipe.createNewRecipeList();
// console.log(newRecipeObjectList);
