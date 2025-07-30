import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service'
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
})
export class RecipesComponent {
  protected IMAGES_RECIPES_FILE_PATH = environment.imagesRecipesFilePath;
  protected recipes: Recipe[] = [];
  protected categories: Category[] = [];
  protected filteredCategoryIds: number[] = [];
  protected filteredRecipes: Recipe[] = [];

  private subscription = new Subscription();

  constructor(private recipeService: RecipeService, private categoryService: CategoryService) {}

  public ngOnInit(): void {
    this.setRecipes();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  protected addOrRemoveCategoryIdFromFilter(categoryId: number = 0): void {
    if (!categoryId) {
      this.filteredCategories = [];
    } else if (this.filteredCategories.includes(categoryId)) {
      this.filteredCategories = this.filteredCategories.filter(id => id != categoryId);
      // Turn all filters off
      this.filteredCategoryIds.forEach((categoryId) => this.adjustCategoryIsInFilter(categoryId));
      this.filteredCategoryIds = [];
      this.filteredRecipes = this.recipes;
      this.adjustFilteredRecipesWithinCategories();
    } else if (this.filteredCategoryIds.includes(categoryId)) {
      // Turn filter off for given categoryId
      this.adjustCategoryIsInFilter(categoryId);
      this.filteredCategoryIds = this.filteredCategoryIds.filter((id) => id != categoryId);
      this.filteredRecipes = this.filterRecipes();
      this.adjustFilteredRecipesWithinCategories();
    } else {
      // Turn filter on for given categoryId
      this.adjustCategoryIsInFilter(categoryId);
      this.filteredCategoryIds.push(categoryId);
      this.filteredRecipes = this.filterRecipes(categoryId);
      this.adjustFilteredRecipesWithinCategories();
    }
  }

  protected getNumberOfRecipes(categoryId: number): number {
    return this.getFilteredRecipes(categoryId).length;
  }

  protected hasNoRecipes(categoryId: number): boolean {
    return this.getFilteredRecipes(categoryId).length === 0;
  }

  private adjustFilteredRecipesWithinCategories(): void {
    this.categories.forEach((category) => (category.filteredRecipes = this.filterRecipes(category.id)));
  }

  private adjustCategoryIsInFilter(categoryId: number): void {
    const category = this.categories.filter((category) => category.id === categoryId)[0];
    category.isInFilter = !category.isInFilter;
  }

  private filterRecipes(categoryId: number = 0): Recipe[] {
    const idsForFilter = categoryId ? this.filteredCategoryIds.concat(categoryId) : this.filteredCategoryIds;
    return this.recipes.filter((recipe) =>
      idsForFilter.every((id) => recipe.categories.some((category) => category.id == id))
    );
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
