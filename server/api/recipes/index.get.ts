import { Recipe } from "~/server/models/recipe.model"

export default defineEventHandler(async (event) => {
    const recipes = await Recipe.find()
    return {
        recipes
    }
})