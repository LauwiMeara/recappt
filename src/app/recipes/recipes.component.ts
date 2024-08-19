import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent {
  protected categories: Category[] = [];
  protected filteredCategoryIds: number[] = [];
  protected recipes: Recipe[] = [];
  protected filteredRecipes: Recipe[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private recipeService: RecipeService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.setRecipes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  protected filter(categoryId: number = 0): void {
    if (!categoryId) {
      this.filteredCategoryIds = [];
      this.filteredRecipes = this.recipes;
    } else if (this.filteredCategoryIds.includes(categoryId)) {
      this.filteredCategoryIds = this.filteredCategoryIds.filter((id) => id != categoryId);
      this.filteredRecipes = this.filterRecipes();
    } else {
      this.filteredCategoryIds.push(categoryId);
      this.filteredRecipes = this.filterRecipes();
    }
  }

  protected getNumberOfRecipes(categoryId: number): number {
    return this.getRecipesFilteredByCategoryId(categoryId).length;
  }

  protected hasNoRecipes(categoryId: number): boolean {
    return this.getRecipesFilteredByCategoryId(categoryId).length === 0;
  }

  protected getRecipesFilteredByCategoryId(categoryId: number | null = null): Recipe[] {
    let extendedFilteredCategories = this.filteredCategoryIds.slice();

    if (categoryId) {
      extendedFilteredCategories.push(categoryId);
    }

    return this.recipes.filter((recipe) =>
      extendedFilteredCategories.every((id) => recipe.categories.some((category) => category.id == id))
    );
  }

  protected getImageUrl(recipe: Recipe): string {
    return recipe.imageName && environment.imagesRecipesFilePath + recipe.imageName;
  }

  private filterRecipes(categoryId: number = 0): Recipe[] {
    const idsForFilter = categoryId ? this.filteredCategoryIds.concat(categoryId) : this.filteredCategoryIds;
    return this.recipes.filter((recipe) =>
      idsForFilter.every((id) => recipe.categories.some((category) => category.id == id))
    );
  }

  private setRecipes(): void {
    this.subscriptions.push(
      this.recipeService.getRecipes().subscribe((recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      })
    );
    this.subscriptions.push(
      this.categoryService.getCategories().subscribe((categories) => {
        this.categories = categories;
      })
    );
  }
}
