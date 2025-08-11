import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { filter, map, Observable, switchMap, tap } from 'rxjs';
import { jsonToRecipeIngredient, RecipeIngredient, RecipeIngredientJSON } from '../models/recipe-ingredient';
import { jsonToRecipeStep, RecipeStep, RecipeStepJSON } from '../models/recipe-step';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = "assets/recipes.json";
  private ingredientsUrl = "assets/ingredients.json";
  private recipeStepsUrl = "assets/recipe_steps.json";

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  public getRecipe(id: number): Observable<Recipe> {
    return this.getRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.id == id)[0]),
      switchMap(recipe =>
        this.http.get<RecipeIngredientJSON[]>(this.ingredientsUrl).pipe(
          map(ingredients => {
            recipe.ingredients = ingredients
              .filter(ingredient => ingredient.recipe_id == recipe.id)
              .map(ingredient => jsonToRecipeIngredient(ingredient));
            return recipe;
          })
        ),
      ),
      switchMap(recipe =>
        this.http.get<RecipeStepJSON[]>(this.recipeStepsUrl).pipe(
          map(steps => {
            recipe.steps = steps
              .filter(step => step.recipe_id == recipe.id)
              .sort((a, b) => a.number - b.number)
              .map(step => jsonToRecipeStep(step));
            return recipe;
          })
        )
      )
    );
  }
}
