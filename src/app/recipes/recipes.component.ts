import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { environment } from 'src/environments/environment';
import { combineLatest, combineLatestWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html'
})
export class RecipesComponent {
  protected IMAGES_RECIPES_FILE_PATH = environment.imagesRecipesFilePath;

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

  protected addOrRemoveCategoryIdFromFilter(categoryId: number = 0): void {
    if (!categoryId) {
      // Turn all filters off
      this.filteredCategoryIds = [];
      this.filteredRecipes = this.recipes;
      this.adjustFilteredRecipesWithinCategories();
    } else if (this.filteredCategoryIds.includes(categoryId)) {
      // Turn filter off for given categoryId
      this.filteredCategoryIds = this.filteredCategoryIds.filter((id) => id != categoryId);
      this.adjustCategoryIsInFilter(categoryId);
      this.filteredRecipes = this.filterRecipes();
      this.adjustFilteredRecipesWithinCategories();
    } else {
      // Turn filter on for given categoryId
      this.filteredCategoryIds.push(categoryId);
      this.adjustCategoryIsInFilter(categoryId);
      this.filteredRecipes = this.filterRecipes(categoryId);
      this.adjustFilteredRecipesWithinCategories();
    }
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

  private setRecipes(): void {
    const recipes$ = this.recipeService.getRecipes();
    const categories$ = this.categoryService.getCategories();
    this.subscriptions.push(
      recipes$.subscribe((recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
      }),
      categories$.subscribe((categories) => {
        this.categories = categories;
        this.categories.forEach((category) => {
          category.filteredRecipes = this.filterRecipes(category.id);
        });
      })
    );
  }
}
