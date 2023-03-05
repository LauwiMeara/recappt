import { RecipeIngredient } from "./recipe-ingredient";
import { RecipeStep } from "./recipe-step";

export interface Recipe {
    id: number;
    createdAt: Date;
    title: string;
    description: string;
    servingsPeople: number;
    servingsPieces: number;
    timePrepInMinutes: number;
    timeWaitInMinutes: number;
    timeOvenInMinutes: number;
    comment: string;
    steps: RecipeStep[];
    ingredients: RecipeIngredient[];
}