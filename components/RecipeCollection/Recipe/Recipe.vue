<template>
    <div class="display flex">
        <div class="info">
            <h1 class="text-2xl font-bold dark:text-white">{{ recipe.name }}</h1>
            <img :src="recipe.img" alt="">
            <p class="description dark:!text-white">{{ recipe.description }}</p>
            <ul class="ingredients">
                <li class="dark:text-white" v-for="ingredient in recipe.ingredients">{{ ingredient }}</li>
            </ul>
            <div class="prep-time dark:!text-white">Preparing time: {{ recipe.prepTime }}</div>
            <div class="rating dark:!text-white">Rating: {{ recipe.rating }}</div>
        </div>
        <div class="vid">
            <iframe width="560" height="315" :src="url" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const props = defineProps({
    name: String
})

let recipes = ref([])
const { data: recipesData } = await useAsyncData('recipes', () => {
    return $fetch('/api/recipes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    }, {
    watch: []
})
watchEffect(() => {
    recipes = recipesData._rawValue.recipes || []
})


const name = ref(props.name)
const recipe = recipes.find((recipe) => recipe.webName == name._value)
const url = ref('')
url.value = recipe.link.replace("watch?v=", "embed/")

</script>

<style scoped lang="scss">
.display {
    margin-left: 10px;
    margin-top: 10px;
    gap: 40px;
    flex-wrap: wrap;
}

.info {
    flex: 1;
    max-width: 700px;
}

.vid {
    flex: 1;
    max-width: 800px;
    height: 450px;
    margin-top: 50px;
}

img {
    margin-top: 30px;
    width: 450px;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.description {
    margin-top: 20px;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
}

.ingredients {
    margin-top: 20px;
    list-style-type: disc;
    padding-left: 20px;
    font-size: 1rem;
    color: #555;
}

.prep-time, .rating {
    margin-top: 15px;
    font-size: 1rem;
    font-weight: bold;
    color: #444;
}

iframe {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

@media screen and (max-width: 600px) {
    .vid {
        height: 300px;
    }
}

@media screen and (max-width: 540px) {
    .vid {
        height: 250px;
    }
}
</style>