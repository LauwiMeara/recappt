export interface RecipeStep {
    id: number;
    recipeId: number;
    number: number;
    description: string;
    isActive: boolean;
}