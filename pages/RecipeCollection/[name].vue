<template>
    <div>
        <Recipe :name="name" />
    </div>
</template>

<script setup>

import Recipe from '~/components/RecipeCollection/Recipe/Recipe.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const name = ref(route.params.name)

</script>

<style scoped lang="scss">
</style>
