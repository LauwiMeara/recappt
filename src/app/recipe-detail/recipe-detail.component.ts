import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent {
  recipe?: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private location: Location) {}

  ngOnInit(): void {
    this.setRecipe();
  }

  goBack(): void {
    this.location.back();
  }

  setRecipe(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe(recipe => this.recipe = recipe);
  }
}
