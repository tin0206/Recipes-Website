<template>
    <div>
        
    </div>
</template>

<script setup>

import { ref } from 'vue'
import recipes from '~/store/recipes/RecipesRepository'

const props = defineProps({
    name: String
})

const name = ref(props.name)
const recipe = await recipes.find((recipe) => recipe.webName == name._value)
console.log(recipe)


</script>