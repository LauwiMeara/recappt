import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service'
import {faUtensils, faBreadSlice, faBowlRice, faEgg, faCarrot, faCookie, faBacon, faCheese} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  filteredCategories: number[] = [];
  faUtensils = faUtensils;
  faBread = faBreadSlice;
  faRice = faBowlRice;
  faEgg = faEgg;
  faCarrot = faCarrot;
  faPotato = faCookie;
  faPasta = faBacon;
  faCake = faCheese;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.setRecipes();
  }

  setRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    })
  }

  filter(categoryId: number) {
    if (!categoryId) {
      this.filteredCategories = [];
    } else if (this.filteredCategories.includes(categoryId)) {
        this.filteredCategories = this.filteredCategories.filter(id => id != categoryId);
    } else {
      this.filteredCategories.push(categoryId);
    }
  }

  hasNoRecipes(categoryId: number): boolean {
    return this.getFilteredRecipes(categoryId).length === 0;
  }

  getFilteredRecipes(categoryId: number | null = null): Recipe[] {
    let extendedFilteredCategories = this.filteredCategories.slice();
    
    if (categoryId) {
      extendedFilteredCategories.push(categoryId);
    }

    return this.recipes.filter(recipe => extendedFilteredCategories.every(id => recipe.categories.some(category => category.id == id)));
  }
}
