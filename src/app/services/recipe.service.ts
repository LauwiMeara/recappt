import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = 'assets/recipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.getRecipes().pipe(map((recipes) => recipes.filter((recipe) => recipe.id === id)[0]));
  }
}
