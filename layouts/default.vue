<template>
    <TopbarMain :class="{ hidden: !showMain }"/>
    <Topbar :class="{ hidden: !showVice }"/>
    <div class="display">
        <slot />
    </div>
</template>

<script setup>

import Topbar from '~/components/Topbar.vue'
import TopbarMain from '~/components/TopbarMain.vue'

import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const showVice = ref(true)
const showMain = ref(false)

watch(
    () => route.fullPath,
    (newPath) => {
        if (newPath == '/' || newPath == '/LandingPage' || newPath == '/AddRecipe') {
            showMain.value = true;
            showVice.value = false;
        } else if (newPath == '/RecipeCollection') {
            showMain.value = false;
            showVice.value = true;
        }
    },
    { immediate: true }
)

</script>

<style scoped lang="scss">
.hidden {
    display: none !important;
}
.display {
    margin-top: 30px;
    @media (min-width: 768px) {
        margin-left: 50px;
        margin-right: 20px;
    }
}
</style>