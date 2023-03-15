import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service'
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  recipes: Recipe[] = [];
  categories: Category[] = [];
  filteredCategories: number[] = [];

  constructor(private recipeService: RecipeService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.setRecipes();
  }

  setRecipes(): void {
    this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    })
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
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

  getNumberOfRecipes(categoryId: number): number {
    return this.getFilteredRecipes(categoryId).length;
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
  
  getImageUrl(recipe: Recipe) {
    return recipe.imageName && environment.imagesRecipesFilePath + recipe.imageName;
  }
}
