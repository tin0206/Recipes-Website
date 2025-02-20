<template>
    <h1 class="text-2xl font-bold dark:text-white">
       Share Your Recipe 
    </h1>
    <div class="input flex flex-col">
        <input type="text" v-model="name" placeholder="Recipe Name" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="ingredients" placeholder="Ingredients" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="description" placeholder="Description" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="cookingTime" placeholder="Preparation Time" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <div class="img">Image: 
            <input type="file" @change="onFileSelected">
            <button @click="onUpLoad">UpLoad</button>
        </div>
        <!-- <img v-if="img.value" :src="img.value" class="w-40 h-40 object-cover mt-2" /> -->
        <input type="text" v-model="link" placeholder="Link" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <input type="text" v-model="rating" placeholder="Rating" class="input-field border px-5 py-1 m-1 border-black/40 rounded-md" />
        <div class="buttons flex">
            <button class="cancel" @click="cancelRecipe">Cancel</button>
            <button class="submit" @click="submitRecipe">Submit</button>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'

let recipesList = []

async function fetchRecipes() {
    try {
        const response = await $fetch('/api/recipes')
        response.recipes.forEach(recipe => {
            recipesList.push(recipe)
        })
    } catch (error) {}
}

const name = ref('')
const ingredients = ref('')
const description = ref('')
const cookingTime = ref('')
const img = ref(null)
const link = ref('')
const rating = ref('')

await fetchRecipes()

const onFileSelected = (event) => {
    img.value = event.target.files[0]
}

const submitRecipe = async () => {
    try {
        
        const ingredientsList = ingredients.value.split(',').map(ingredient => ingredient.trim())

        const response = await $fetch('/api/recipes', {
            method: 'POST',
            body: {
                name: name.value,
                ingredients: ingredientsList,
                description: description.value,
                cookingTime: cookingTime.value,
                img: '',
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
}

const onUpLoad = async () => {
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