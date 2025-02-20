import { Schema, model } from "mongoose"

const RecipeSchema = new Schema({
    name: {
        type: String,
    },
    ingredients: {
        type: [String],
    },
    description: {
        type: String,
    },
    prepTime: {
        type: String,
    },
    img: {
        type: String,
    },
    link: {
        type: String,
    },
    rating: {
        type: Number,
    }
})

export const Recipe = model<any>('Recipe', RecipeSchema, 'recipes')