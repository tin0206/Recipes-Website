<template>
    <header>
        <nav class="topbar">
            <div class="left">
                <img src="../assets/main/logo.png" alt="" class="w-9 h-9" />
                <h4 class="text-2xl font-bold dark:text-white">Recipe Haven</h4>
                <ul class="nav">
                    <li :class="{ current: isActive('/') || isActive('/LandingPage') }">
                        <NuxtLink to="/" class="text-black dark:text-white">Home</NuxtLink>
                    </li>
                    <li :class="{ current: isActive('/RecipeCollection') }">
                        <NuxtLink to="/RecipeCollection" class="text-black dark:text-white">Recipes</NuxtLink>
                    </li>
                    <li :class="{ current: isActive('/AddRecipe') }">
                        <NuxtLink to="/AddRecipe" class="text-black dark:text-white">Add Recipe</NuxtLink>
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
                />
            </div>
        </nav>
    </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const isActive = (path) => route.path === path
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

    .left {
        display: flex;
        align-items: center;
        margin-left: 10px;
        h4 {
            margin-left: 8px;
            margin-right: 30px;
        }
        .nav {
            display: flex;
            gap: 25px;
            li {
                display: flex;
                align-items: center;
                font-size: 19px;
                height: 50px;
            }
        }
    }

    .right {
        width: 350px;
        margin-right: 20px;
        .input-form {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
        }
    }
}

@media only screen and (max-width: 800px) {
    .right {
       display: none;
    }
}
</style>