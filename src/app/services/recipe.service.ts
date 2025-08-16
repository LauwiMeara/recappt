import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { map, Observable, switchMap, tap } from 'rxjs';
import { RecipeIngredient } from '../models/recipe-ingredient';
import { RecipeStep } from '../models/recipe-step';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = environment.production ? "https://raw.githubusercontent.com/LauwiMeara/recappt-client/refs/heads/main/src/assets/recipes.json" : "assets/recipes.json";
  private ingredientsUrl = environment.production ? "https://raw.githubusercontent.com/LauwiMeara/recappt-client/refs/heads/main/src/assets/ingredients.json" : "assets/ingredients.json";
  private recipeStepsUrl = environment.production ? "https://raw.githubusercontent.com/LauwiMeara/recappt-client/refs/heads/main/src/assets/recipe_steps.json" : "assets/recipe_steps.json";

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  public getRecipe(id: number): Observable<Recipe> {
    return this.getRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.id == id)[0]),
      switchMap(recipe =>
        this.http.get<RecipeIngredient[]>(this.ingredientsUrl).pipe(
          map(ingredients => {
            recipe.ingredients = ingredients
              .filter(ingredient => ingredient.recipeId == recipe.id);
            return recipe;
          })
        ),
      ),
      switchMap(recipe =>
        this.http.get<RecipeStep[]>(this.recipeStepsUrl).pipe(
          map(steps => {
            recipe.steps = steps
              .filter(step => step.recipeId == recipe.id)
              .sort((a, b) => a.number - b.number);
            return recipe;
          })
        )
      )
    );
  }
}
