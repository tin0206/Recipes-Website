<template>
    <div class="popular-recipes">
        <h1 class="text-2xl font-bold dark:text-white">Popular Recipes</h1>
        <div class="recipe-cover">
            <ul class="recipe-list">
                <li v-for="recipe in recipesList.slice(0, 12)" :key="recipe.id" class="recipe">
                    <img :src="recipe.img" alt="Recipe Image" class="" />
                    <h4 class="font-bold dark:text-white">{{ recipe.name }}</h4>
                    <p class="dark:text-white">{{ recipe.description }}</p>
                    <p class="dark:text-white">Prep time: {{ recipe.prepTime }}</p>
                    <div class="view-recipe">
                        <NuxtLink :to="`/${recipe.webName}`" class="text-black dark:text-white choice"><span>View Recipe</span></NuxtLink>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>

import { getRecipes } from '~/store/recipes/RecipesRepository'
import { ref } from 'vue'

const recipes = ref([])
const loadRecipes = async () => {
    const temp_recipes = await getRecipes()
    recipes.value = temp_recipes
}
loadRecipes()
const recipesList = ref(recipes)

</script>

<style scoped lang="scss">
.popular-recipes {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 80px;
}

.recipe-cover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    margin-top: 10px;
    width: 90%;
    max-width: 1300px;
    overflow-x: auto;
}

.recipe-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.recipe {
    background: white;
    padding: 10px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 8px;
    width: 220px;

    img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        border-radius: 5px;
    }

    h4 {
        margin-top: 5px;
        font-size: 15px;
    }

    p {
        height: 50px;
        font-size: 12px;
        margin-top: 5px;
    }

    .view-recipe {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        width: 100%;
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

@media only screen and (max-width: 768px) {
    .recipe-cover {
        width: 100%;
    }

    .recipe-list {
        flex-direction: column;
        align-items: center;
    }

    .recipe {
        width: 90%;
    }
}

@media only screen and (max-width: 500px) {
    .recipe-cover {
        padding: 10px;
    }

    .recipe {
        width: 100%;
        margin-left: 0 !important;
    }
}
</style>