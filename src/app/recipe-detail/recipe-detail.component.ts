import { Component, HostListener, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent {
  recipe?: Recipe;
  currentActiveStep = 0;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.setRecipe();
  }

  @HostListener('window:keydown.space', ['$event'])
  onSpacebar(event: KeyboardEvent) {
    event.preventDefault(); // prevent default space bar 'scroll down' browser behavior
    this.nextStep();
  }

  nextStep(): void {
    if (this.recipe) {
      const activeStep = this.recipe?.steps.filter((step) => step.isActive)[0];
      if (!activeStep) {
        this.recipe.steps[0].isActive = true;
      } else {
        activeStep.isActive = false;
        if (activeStep.number < this.recipe.steps.length) {
          this.recipe.steps[activeStep.number].isActive = true;
        }
      }
    }
  }

  goBack(): void {
    this.location.back();
  }

  setRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService
      .getRecipe(id)
      .subscribe((recipe) => (this.recipe = recipe));
  }
}
