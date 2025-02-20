<template>
    <header>
        <nav class="topbar">
            <div class="left">
                <NuxtLink to="/">
                    <img src="../assets/main/logo.png" alt="" class="w-9 h-9" />
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
            display: flex;
            gap: 25px;
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

@media only screen and (max-width: 885px) {
    h4 {
        font-size: 15px;
    }
}

@media only screen and (max-width: 821px) {
    .left {
        width: 500px !important;
        .nav {
            gap: 5px;
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

@media only screen and (max-width: 730px) {
    .left {
        width: 300px !important;
        .nav {
            gap: 5px;
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

@media only screen and (max-width: 630px) {
    .left {
        width: 200px !important;
        .nav {
            gap: 5px;
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
</style>