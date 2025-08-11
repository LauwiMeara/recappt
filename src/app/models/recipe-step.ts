export interface RecipeStep {
    id: number;
    recipeId: number;
    number: number;
    description: string;
    isActive: boolean;
}

export interface RecipeStepJSON {
    id: number;
    recipe_id: number;
    number: number;
    description: string;
}

export function jsonToRecipeStep(json: RecipeStepJSON): RecipeStep {
    return {
        id: json.id,
        recipeId: json.recipe_id,
        number: json.number,
        description: json.description,
        isActive: false
    }
}