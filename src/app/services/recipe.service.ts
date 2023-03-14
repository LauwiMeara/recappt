import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {Recipe} from '../models/recipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipesUrl = environment.apiUrl + environment.recipesEndPoint;

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(this.recipesUrl + '/' + id)
  }
}
