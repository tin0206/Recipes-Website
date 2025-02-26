import { Recipe } from "~/server/models/recipe.model"

export default defineEventHandler(async (event) => {
    const recipes = await Recipe.find().lean()
    recipes.sort((a, b) => a.name.localeCompare(b.name))
    
    return {
        recipes
    }
})