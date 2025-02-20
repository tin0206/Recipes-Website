import { Recipe } from "~/server/models/recipe.model"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    if (!body.name || !body.ingredients || !body.description) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input: name, ingredients, and description are required.",
        })
    }

    try {
        const newRecipe = new Recipe({
            name: body.name,
            ingredients: body.ingredients,
            description: body.description,
            prepTime: body.prepTime || "1 hr",
            img: body.img || "/recipecollection/Default.jpg",
            link: body.link || "",
            rating: body.rating || 2.5,
        })

        await newRecipe.save();

        return {
            message: "Recipe added successfully!",
            recipe: newRecipe,
        }
    } catch (error) {
        console.error("Error adding recipe:", error);
        throw createError({
            statusCode: 500,
            statusMessage: "Failed to add recipe to the database.",
        })
    }
})