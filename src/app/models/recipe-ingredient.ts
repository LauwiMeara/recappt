export interface RecipeIngredient {
    id: number;
    recipeId: number;
    amount: number;
    unitOfMeasurement: string;
    name: string;
    description: string;
}