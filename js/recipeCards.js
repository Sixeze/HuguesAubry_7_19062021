import { displayComboBox } from "./comboBox.js";

/**
 *
 * @param {object array} arrayOfRecipes array for displaying recipe
 */
export function displayRecipes(arrayOfRecipes) {
  let mainDisplayRecipes = document.querySelector("#displayRecipes");

  mainDisplayRecipes.innerHTML = "";

  if (arrayOfRecipes.length === 0) {
    mainDisplayRecipes.innerHTML = `<p class="text-center h3">Aucune recette ne correspond à votre critère… vous pouvez
                                    chercher "tarte aux pommes", "poisson", etc.</p>`;
  }
  arrayOfRecipes.forEach((recipe) => {
    const articleRecipes = document.createElement("article");
    articleRecipes.classList.add(
      "card",
      "col-md-6",
      "col-xl-4",
      "mb-4",
      "articleCard"
    );
    articleRecipes.innerHTML = `<img class="card-img-top bg-color src="" alt="" width="auto" height="200px">
                                <div class="card-body g-0">
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
  displayComboBox(arrayOfRecipes);
}
