<template>
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
</template>

<script setup>

import recipes from '~/store/recipes/RecipesRepository'

const recipesList = ref(recipes)
const clickedRecipe = ref(false)
const recipe_id = ref('')
const hasBeenDeleted = ref(false)

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

@media (max-width: 1024px) {
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

@media (max-width: 768px) {
    .recipe {
        width: 100%;
        max-width: 350px;
    }

    .item {
        flex-direction: column;
    }

    .image {
        height: 150px;
    }
}

@media (max-width: 735px) {
    h1 {
        display: flex;
        justify-content: center;
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