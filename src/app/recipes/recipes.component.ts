import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service'
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service'
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  protected recipes: Recipe[] = [];
  protected categories: Category[] = [];
  protected filteredCategories: number[] = [];
  private subscription = new Subscription();

  constructor(private recipeService: RecipeService, private categoryService: CategoryService) { }

  public ngOnInit(): void {
    this.setRecipes();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected filter(categoryId: number) {
    if (!categoryId) {
      this.filteredCategories = [];
    } else if (this.filteredCategories.includes(categoryId)) {
      this.filteredCategories = this.filteredCategories.filter(id => id != categoryId);
    } else {
      this.filteredCategories.push(categoryId);
    }
  }

  protected getNumberOfRecipes(categoryId: number): number {
    return this.getFilteredRecipes(categoryId).length;
  }

  protected hasNoRecipes(categoryId: number): boolean {
    return this.getFilteredRecipes(categoryId).length === 0;
  }

  protected getFilteredRecipes(categoryId: number | null = null): Recipe[] {
    let extendedFilteredCategories = this.filteredCategories.slice();

    if (categoryId) {
      extendedFilteredCategories.push(categoryId);
    }

    return this.recipes.filter(recipe => extendedFilteredCategories.every(id => recipe.categories.some(category => category.id == id)));
  }

  protected getImageUrl(recipe: Recipe) {
    return recipe.imageName && environment.imagesRecipesFilePath + recipe.imageName;
  }

  private setRecipes(): void {
    this.subscription.add(this.recipeService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
    }));
    this.subscription.add(this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }));
  }
}
