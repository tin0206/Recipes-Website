<template>
    <h1 class="text-2xl font-bold dark:text-white">
       Share Your Recipe 
    </h1>
    <div class="input flex flex-col">
        <input type="text" v-model="name" @change="checkName" placeholder="Recipe Name" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="ingredients" @change="checkIngredients" placeholder="Ingredients" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="description" @change="checkDescription" placeholder="Description" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="cookingTime" @change="checkCookingTime" placeholder="Preparation Time" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <div class="img">Image: 
            <input type="file" @change="onFileSelected" ref="fileInput">
        </div>
        <input type="text" v-model="link" @change="checkLink" placeholder="Link" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="rating" @change="checkRating" placeholder="Rating" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <div class="buttons flex">
            <button class="cancel" @click="cancelRecipe">Cancel</button>
            <button class="submit" @click="submitRecipe">Submit</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import recipes from '~/store/recipes/RecipesRepository'

let recipesList = []

async function fetchRecipes() {
    recipes.forEach(recipe => {
        recipesList.push(recipe)
    })
}

const name = ref('')
const ingredients = ref('')
const description = ref('')
const cookingTime = ref('')
const img = ref(null)
const link = ref('')
const rating = ref('')
const fileInput = ref(null)

await fetchRecipes()

const checkName = () => {
    name.value = name.value.trim()
    name.value = name.value.replace(/\s+/g, ' ')
    if (name.value.length > 30) {
        alert('Recipe name should not exceed 30 characters.')
        name.value = ''
    }
    const formatedName = name.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

    recipesList.forEach(recipe => {
        if (recipe.name == formatedName) {
            alert('Recipe name already exists. Please choose a different name.')
            name.value = ''
            return
        }
    })
    name.value = formatedName
    return
}

const checkIngredients = () => {
    ingredients.value = ingredients.value.trim()
    ingredients.value = ingredients.value.replace(/\s+/g, ' ')
    ingredients.value = ingredients.value.split(',').map(ingredient => ingredient.trim()).join(', ')
    return
}

const checkDescription = () => {
    description.value = description.value.trim()
    description.value = description.value.replace(/\s+/g, ' ')
    if (description.value.length > 100) {
        alert('Description should not exceed 100 characters.')
        description.value = ''
    }
    if (description.value && !description.value.endsWith('.')) {
        description.value += '.'
    }
    return
}

const checkCookingTime = () => {
    cookingTime.value = cookingTime.value.trim()
    cookingTime.value = cookingTime.value.replace(/\s+/g, ' ')
    const timeString = cookingTime.value.split(' ')
    if (timeString.length != 2) {
        alert('Invalid time format. Please enter time in the format "[number] [unit]".')
        cookingTime.value = ''
        return
    }
    const time = parseFloat(timeString[0])
    let unit = timeString[1]
    if (unit.startsWith('m') || unit.startsWith('M'))
        unit = 'min'
    if (unit.startsWith('h') || unit.startsWith('H'))
        unit = 'hr'
    if (unit.startsWith('s') || unit.startsWith('S'))
        unit = 'sec'
    if (isNaN(time) || time <= 0 || !['min', 'hr', 'sec'].includes(unit)) {
        alert('Invalid time format. Please enter time in the format " [number] [unit]".')
        cookingTime.value = ''
        return
    }
    cookingTime.value = `${time} ${unit}`
}

const checkLink = () => {
    link.value = link.value.trim()
    if (!link.value.startsWith('https://www.youtube.com/watch?v=') 
    || !link.value.includes('youtube.com')
    || !/[?&]v=[\w-]{11}/.test(link.value))
    {
        alert('Invalid link. Please enter a valid YouTube link.')
        link.value = ''
    }
    link = link.value.split('&')[0]
    recipesList.forEach(recipe => {
        if (recipe.link == link.value) {
            alert('Recipe link already exists. Please choose a different link.')
            link.value = ''
            return
        }
    })
    return
}

const checkRating = () => {
    rating.value = rating.value.trim()
    rating.value = rating.value.replace(/\s+/g, ' ')
    const numRating = parseFloat(rating.value)
    if (isNaN(numRating) || numRating < 0 || numRating > 5) {
        alert('Rating should be between 0 and 5.')
        rating.value = ''
    }
    return
}

const onFileSelected = (event) => {
    const file = event.target.files[0]
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
        alert('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.')
        return
    }
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
        alert('File size exceeds 5MB. Please choose a smaller file.')
        return
    }
    img.value = file
}

const check = () => {
    if (name.value == undefined || name.value == '') {
        alert('Please input the name')
        name.value = ''
        return false
    }
    if (ingredients.value == undefined || ingredients.value == '') {
        alert('Please input the ingredients')
        ingredients.value = ''
        return false
    }
    if (description.value == undefined || description.value == '') {
        alert('Please input the description')
        description.value = ''
        return false
    }
    if (cookingTime.value == undefined || cookingTime.value == '') {
        alert('Please input the cooking time')
        cookingTime.value = ''
        return false
    }
    if (link.value == undefined || link.value == '') {
        alert('Please input the link')
        link.value = ''
        return false
    }
    if (rating.value == undefined || rating.value == '') {
        alert('Please input the rating')
        rating.value = ''
        return false
    }
    return true
}

const submitRecipe = async () => {
    try {
        
        if (!check()) {
            cancelRecipe()
            return
        }

        const ingredientsList = ingredients.value.split(',').map(ingredient => ingredient.trim())

        let base64Image = ''
        if (img.value) {
            base64Image = await new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
                reader.readAsDataURL(img.value)
            })
        }

        alert('Please wait for the recipe to be submitted.')

        const response = await $fetch('/api/recipes', {
            method: 'POST',
            body: {
                name: name.value,
                ingredients: ingredientsList,
                description: description.value,
                cookingTime: cookingTime.value,
                img: base64Image,
                link: link.value,
                rating: parseFloat(rating.value)
            },
        })

        console.log('Recipe submitted:', response);
        alert('Recipe submitted successfully!');
        cancelRecipe()

    } catch (error) {
        console.error('Failed to submit recipe:', error)
        alert('Failed to submit recipe. Please try again.')
    }
}

const cancelRecipe = () => {
    name.value = ''
    ingredients.value = ''
    description.value = ''
    cookingTime.value = ''
    img.value = null
    link.value = ''
    rating.value = ''
    fileInput.value.value = ''
}

</script>

<style scoped lang="scss">
h1 {
    margin-top: 50px;
    margin-bottom: 40px;
}
input {
    margin-top: 5px;
    margin-left: 10px;
    width: 450px;
}
.img {
    margin-left: 10px;
    input {
        width: 300px;
    }
    button {
        width: 75px;
        border: 1px solid #636ae8;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        border: 1px solid #636ae8;
        border-radius: 5px;
        padding: 5px 0;
        cursor: pointer;
        span {
            color: #636ae8;
        }
    }
}
.buttons {
    margin-top: 20px;
    gap: 20px;
    margin-left: 15%;
}
.cancel, .submit {
    width: 75px;
    border: 1px solid #636ae8;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    border: 1px solid #636ae8;
    border-radius: 5px;
    padding: 5px 0;
    cursor: pointer;
    span {
        color: #636ae8;
    }
}
@media screen and (max-width: 480px) {
    .buttons {
        margin-left: 30% !important;
    }
    h1 {
        display: flex;
        justify-content: center;
    }
    input {
        width: 400px !important;
    }
    .img {
        input {
            width: 285px !important;
        }
        button {
            width: 60px !important;
        }
    }
}
</style>