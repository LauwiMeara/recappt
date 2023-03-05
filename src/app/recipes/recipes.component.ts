import { Component } from '@angular/core';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  recipes: Recipe[] = [{
    id: 1,
    createdAt: new Date(),
    title: 'Traybake',
    description: 'Robbie\'s masterrecept!',
    servingsPeople: 2,
    servingsPieces: 0,
    timeOvenInMinutes: 30,
    timePrepInMinutes: 0,
    timeWaitInMinutes: 0,
    comment: 'Comment!',
    ingredients: [{"id":1,"amount":1.0,"unitOfMeasurement":"kg","name":"aardappel","description":"vastkokend"},{"id":2,"amount":4.0,"unitOfMeasurement":"","name":"uien","description":"middelgroot"},{"id":3,"amount":500.0,"unitOfMeasurement":"g","name":"broccoli","description":""},{"id":4,"amount":4.0,"unitOfMeasurement":"el","name":"olijfolie","description":""},{"id":5,"amount":3.0,"unitOfMeasurement":"el","name":"ras el hanout","description":""},{"id":6,"amount":150.0,"unitOfMeasurement":"g","name":"gerookte kipreepjes","description":""}],
    steps: []
  },
  {
    id: 2,
    createdAt: new Date(),
    title: 'Hamburger',
    description: 'Sappige buns.',
    servingsPeople: 1,
    servingsPieces: 0,
    timeOvenInMinutes: 0,
    timePrepInMinutes: 10,
    timeWaitInMinutes: 0,
    comment: 'Comment!',
    ingredients: [{"id":1,"amount":1.0,"unitOfMeasurement":"kg","name":"aardappel","description":"vastkokend"},{"id":2,"amount":4.0,"unitOfMeasurement":"","name":"uien","description":"middelgroot"},{"id":3,"amount":500.0,"unitOfMeasurement":"g","name":"broccoli","description":""},{"id":4,"amount":4.0,"unitOfMeasurement":"el","name":"olijfolie","description":""},{"id":5,"amount":3.0,"unitOfMeasurement":"el","name":"ras el hanout","description":""},{"id":6,"amount":150.0,"unitOfMeasurement":"g","name":"gerookte kipreepjes","description":""}],
    steps: []
  }]

  selectedRecipe?: Recipe;
  onSelect(recipe: Recipe): void {
    this.selectedRecipe = recipe;
}
}
