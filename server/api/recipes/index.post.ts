import { Recipe } from "~/server/models/recipe.model"
import { uploadImageToCloudinary } from "~/server/utils/cloudinary"

export default defineEventHandler(async (event) => {

    const body = await readBody(event)

    if (!body.name || !body.ingredients || !body.description) {
        throw createError({
            statusCode: 400,
            statusMessage: "Invalid input: name, ingredients, and description are required.",
        })
    }

    if (body.img && body.img.startsWith('data:')) {
        const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        const mimeType = body.img.match(/^data:(.*);base64/)[1]
    
        if (!allowedMimeTypes.includes(mimeType)) {
          throw createError({
            statusCode: 400,
            statusMessage: "Invalid image type. Only JPEG, PNG, GIF, and WebP are allowed.",
          })
        }
        const base64Data = body.img.split(',')[1]
        const fileSizeInBytes = Buffer.from(base64Data, 'base64').length
        const maxSize = 5 * 1024 * 1024

        if (fileSizeInBytes > maxSize) {
            throw createError({
                statusCode: 400,
                statusMessage: "Image size exceeds the limit of 5 MB.",
            })
        }
    }

    try {
        let imgUrl = "/recipecollection/Default.jpg"        

        if (body.img && body.img.startsWith('data:')) {
            imgUrl = await uploadImageToCloudinary(body.img)
        }

        const newRecipe = new Recipe({
            name: body.name,
            ingredients: body.ingredients,
            description: body.description,
            prepTime: body.prepTime || "1 hr",
            img: imgUrl,
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