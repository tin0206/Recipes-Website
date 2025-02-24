<template>
    <header>
        <nav class="topbar">
            <div class="left">
                <NuxtLink to="/">
                    <img src="../../assets/main/logo.png" alt="" class="w-9 h-9" />
                </NuxtLink>
                <NuxtLink to="/">
                    <h4 class="text-2xl font-bold dark:text-white">Recipe Haven</h4>
                </NuxtLink>
                <ul class="nav">
                    <li :class="{ current: isActive('/') || isActive('/LandingPage') }">
                        <NuxtLink to="/" class="text-black dark:text-white choice">Home</NuxtLink>
                    </li>
                    <li :class="{ current: isActive('/RecipeCollection') }">
                        <NuxtLink to="/RecipeCollection" class="text-black dark:text-white choice">Recipes</NuxtLink>
                    </li>
                    <li :class="{ current: isActive('/AddRecipe') }">
                        <NuxtLink to="/AddRecipe" class="text-black dark:text-white choice">Add Recipe</NuxtLink>
                    </li>
                </ul>
            </div>
            <div class="right">
                <UInput
                    icon="i-heroicons-magnifying-glass-20-solid"
                    size="sm"
                    color="white"
                    :trailing="false"
                    placeholder="Search..."
                    class="input-form"
                    v-model="search"
                />
            </div>
        </nav>
    </header>
    <div class="display">
        <h1 class="text-2xl font-bold dark:text-white">Recipe Collection</h1>
        <div class="recipe-collection">
            <ul class="recipe-list">
                <li v-for="recipe in recipesList" :key="recipe.id" class="recipe">
                    <a :href="recipe.link" target="_blank" rel="noopener noreferrer" class="item flex">
                        <div class="info">
                            <h4 class="font-bold dark:text-white">{{ recipe.name }}</h4>
                            <p class="dark:text-white">{{ recipe.description }}</p>
                            <div class="dark:text-white">Rating: {{ recipe.rating }}/5</div>
                        </div>
                        <img :src="recipe.img" alt="Recipe Image" class="image" />
                    </a>
                    <button class="delete-btn" @click="checkDeleteRecipe(recipe._id)"><span class="dark:text-white">Delete</span></button>
                </li>
            </ul>
        </div>
        <div class="overlay" :class="{ hidden: !clickedRecipe }">
            <div class="modal">
                <div>Do you want to delete this recipe</div>
                <div class="choices">
                    <button @click="beforeDeleteRecipe(recipe_id)">Yes</button>
                    <button @click="cancelDelete">No</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import recipes from '~/store/recipes/RecipesRepository'
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'

const route = useRoute()
const isActive = (path) => route.path === path

const recipesList = ref(recipes)
const clickedRecipe = ref(false)
const recipe_id = ref('')
const hasBeenDeleted = ref(false)
const search = ref('')

const { data: recipesData } = await useAsyncData('recipes', () => {
    return $fetch('/api/recipes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    }, {
    watch: [hasBeenDeleted]
})

watchEffect(() => {
    recipesList.value = recipesData._rawValue.recipes
    if (search.value == '') {
        recipesList.value = recipes
    }
    else {
        let tempSearch = search.value.toLowerCase()
        recipesList.value = recipes.filter(recipe => recipe.name.toLowerCase().includes(tempSearch))
    }
})

const checkDeleteRecipe = async (id) => {
    clickedRecipe.value = true
    recipe_id.value = id
}

const deleteRecipe = async (id) => {
    const link = recipesList.value.find(recipe => recipe._id === id).link
    try {
        const response = await $fetch('/api/recipes', {
            method: 'DELETE',
            body: { id, link }
        })
        
        console.log('Recipe deleted:', response)
        recipesList.value = recipesList.value.filter(recipe => recipe._id !== id)
    } catch (error) {
        console.error('Error deleting recipe:', error)
        alert('Failed to delete recipe. Please try again.')
    }

    hasBeenDeleted.value = true
    setTimeout(() => {
        clickedRecipe.value = false
    }, 200)
}

const beforeDeleteRecipe = async (id) => {
    await deleteRecipe(id)
}

const cancelDelete = () => {
    clickedRecipe.value = false
}

</script>

<style scoped lang="scss">
.current {
    border-bottom: 3px solid #636ae8;
}

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    border-bottom: 2px solid #e5e7eb;
    flex-wrap: wrap;

    .left {
        display: flex;
        align-items: center;
        margin-left: 10px;
        flex: 1 1 200px;
        h4 {
            margin-left: 8px;
            margin-right: 30px;
        }
        .nav {
            margin-left: 20px;
            display: flex;
            gap: 50px;
            li {
                display: flex;
                align-items: center;
                font-size: 17px;
                height: 50px;
            }
        }
    }

    .right {
        width: 350px;
        margin-right: 20px;
        display: flex;
        justify-content: flex-end;
        .input-form {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
            width: 100%;
            min-width: 150px;
        }
    }
}

@media only screen and (max-width: 930px) {
    .nav {
        li {
            font-size: 15px !important;
        }
        
        gap: 30px !important;
    }
    .input-form {
        width: 300px !important;
    }
}

@media only screen and (max-width: 869px) {
    h4 {
        font-size: 14px !important;
    }

    .nav {
        li {
            font-size: 15px !important;
        }
    }

    .input-form {
        width: 250px !important;
    }
}


@media only screen and (max-width: 830px) {
    h4 {
        font-size: 15px !important;
    }
}

@media only screen and (max-width: 821px) {
    .left {
        width: 500px !important;
        .nav {
            li {
                font-size: 15px !important;
            }
        }
    }
    .right {
        width: 300px !important;
        .input-form {
            width: 200px !important;
        }
    }
}

@media only screen and (max-width: 762px) {
    .left {
        width: 500px !important;
        .nav {
            gap: 20px !important;
            li {
                font-size: 13px !important;
            }
        }
    }
}

@media only screen and (max-width: 730px) {
    .left {
        width: 300px !important;
        .nav {
            li {
                font-size: 15px !important;
            }
        }
    }
    .right {
        width: 200px !important;
        .input-form {
            width: 50px !important;
        }
    }
}

@media only screen and (max-width: 741px) {
    .left {
        width: 200px !important;
        .nav {
            li {
                font-size: 15px !important;
            }
        }
    }
    .right {
        width: 100px !important;
        .input-form {
            width: 50px !important;
        }
    }
}

@media only screen and (max-width: 630px) {
    .left {
        width: 200px !important;
        .nav {
            li {
                font-size: 15px !important;
            }
        }
    }
    .right {
        width: 100px !important;
        .input-form {
            width: 50px !important;
        }
    }
}

@media only screen and (max-width: 588px) {
    .left {
        width: 100px !important;
    }
    .right {
        display: none !important;
    }
}

.display {
    margin-top: 30px;
    @media (min-width: 768px) {
        margin-left: 50px;
        margin-right: 20px;
    }
}

h1 {
    margin-top: 60px;
    margin-bottom: 40px;
}

.recipe-collection {
    display: flex;
    justify-content: center;
    width: 100%;
}

.recipe-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
}

.recipe {
    width: 345px;
    height: 200px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    padding: 5px;
    background: white;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
    }
}

.delete-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 30px;
    margin-top: 5px;
    padding: 10px;
    border: none;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background: #f0f0f0;
    }

    span {
        color: #777;
        font-size: 1rem;
    }
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;
}

.info {
    h4 {
        font-size: 0.95rem;
    }

    p {
        width: 150px;
        height: 90px;
        color: #777;
        font-size: 0.95rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    div {
        margin-top: 15px;
    }
}

.image {
    width: 175px;
    height: 140px;
    object-fit: cover;
    border-radius: 5px;
}

.hidden {
    display: none;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;

    .modal {
        position: relative;
        left: 40%;
        top: 40%;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        height: 200px;
        background: white;
        border-radius: 10px;
        padding: 20px;
    }

    .choices {
        display: flex;
        flex-direction: row;
    }

    button {
        width: 100px;
        height: 30px;
        margin-top: 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s ease-in-out;

        &:hover {
            background: #f0f0f0;
        }
    }
}

@media (max-width: 1160px) {
    .recipe {
        width: 100%;
        max-width: 400px;
        height: auto;
    }

    .item {
        flex-direction: column;
        align-items: flex-start;
    }

    .image {
        width: 100%;
        height: 180px;
        margin-top: 10px;
    }

    .info p {
        width: 100%;
    }
}

@media (max-width: 906px) {
    h1 {
        display: flex;
        justify-content: center;
    }
}

@media (max-width: 768px) {
    h1 {
        display: flex;
        justify-content: center;
    }

    .recipe {
        width: 100%;
        max-width: 450px;
    }

    .item {
        flex-direction: column;
    }

    .image {
        height: 150px;
    }
}

@media (max-width: 743px) {
    h1 {
        display: flex;
        justify-content: center;
    }

    .recipe {
        width: 100%;
        max-width: 400px;
    }
}

@media (max-width: 480px) {
    .recipe {
        width: 100%;
        max-width: 300px;
    }

    .info h4 {
        font-size: 0.9rem;
    }

    .info p {
        font-size: 0.85rem;
    }

    .image {
        height: 130px;
    }
}
</style>