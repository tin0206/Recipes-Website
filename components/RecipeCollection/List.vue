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
            </li>
        </ul>
    </div>
</template>

<script setup>

const response = await $fetch('/api/recipes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})
const recipesList = ref(response.recipes)

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
    height: 170px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
    padding: 5px;
    background: white;
    border-radius: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
        transform: scale(1.05);
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