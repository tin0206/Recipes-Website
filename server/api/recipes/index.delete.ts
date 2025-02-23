import { Recipe } from "~/server/models/recipe.model"
import { deleteImageFromCloudinary } from "~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const id = body.id
    
    
    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: "ID is required",
        })
    }

    try {
        const sub_id = body.link.split("v=")[1]
        await deleteImageFromCloudinary(sub_id)
        const deleteRecipe = await Recipe.findByIdAndDelete(id)
        if (!deleteRecipe) {
            throw createError({
                statusCode: 404,
                statusMessage: "Recipe not found",
            })
        }
        return {
            message: "Recipe deleted successfully!",
        }
    } catch (error) {
        console.error("Error deleting recipe:", error)
        throw createError({
        statusCode: 500,
        statusMessage: "Failed to delete recipe.",
        })
    }
})