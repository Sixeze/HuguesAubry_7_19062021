import { recipes } from "./recipes.js";

export class recipeClass {
  constructor() {
    this.allRecipes = recipes;
    this.newRecipes = [];
    this.allIngredientsSetSort = [
      ...new Set(
        this.allRecipes
          .flatMap((recipe) => recipe.ingredients.map((i) => i.ingredient))
          .sort()
      ),
    ];

    this.allAppliancesSetSort = [
      ...new Set(this.allRecipes.flatMap((recipe) => recipe.appliance).sort()),
    ];

    this.allUstensilsSetSort = [
      ...new Set(this.allRecipes.flatMap((recipe) => recipe.ustensils).sort()),
    ];

    this.arrayForIngredientSelected = [];
    this.arrayForApplianceSelected = [];
    this.arrayForUstensilsSelected = [];
  }

  createAllRecipeList() {
    return this.allRecipes;
  }

  createNewRecipeList() {
    return this.newRecipes;
  }

  createAllIngredientsList() {
    return this.allIngredientsSetSort;
  }

  createAllAppliancesList() {
    return this.allAppliancesSetSort;
  }

  createAllUstensilsList() {
    return this.allUstensilsSetSort;
  }
}
