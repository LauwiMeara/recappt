export interface RecipeIngredient {
    id: number;
    recipeId: number;
    amount: number;
    unitOfMeasurement: string;
    name: string;
    description: string;
}

export interface RecipeIngredientJSON {
    id: number;
    recipe_id: number;
    amount: number;
    unit_of_measurement: string;
    name: string;
    description: string;
}

export function jsonToRecipeIngredient(json: RecipeIngredientJSON): RecipeIngredient {
    return {
        id: json.id,
        recipeId: json.recipe_id,
        amount: json.amount,
        unitOfMeasurement: json.unit_of_measurement,
        name: json.name,
        description: json.description
    }
}
