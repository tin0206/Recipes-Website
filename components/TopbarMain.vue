<template>
    <header>
        <nav class="topbar">
            <div class="right">
                <div class="left">
                    <NuxtLink to="/">
                        <img src="../assets/main/logo.png" alt="" class="w-9 h-9" />
                    </NuxtLink>
                    <NuxtLink to="/">
                        <h4 class="text-2xl font-bold dark:text-white">Recipe Haven</h4>
                    </NuxtLink>
                </div>
                <ul class="nav">
                    <li :class="{ current: isActive('/') || isActive('/LandingPage') }" class="choice">
                        <NuxtLink to="/" class="text-black dark:text-white">Home</NuxtLink>
                    </li>
                    <li :class="{ current: isActive('/RecipeCollection') }" class="choice">
                        <NuxtLink to="/RecipeCollection" class="text-black dark:text-white">Recipes</NuxtLink>
                    </li>
                    <li :class="{ current: isActive('/AddRecipe') }" class="choice">
                        <NuxtLink to="/AddRecipe" class="text-black dark:text-white">Add Recipe</NuxtLink>
                    </li>
                </ul>
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

    .right {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-left: 10px;
        flex: 1 1 200px;

        h4 {
            margin-left: 8px;
            margin-right: 30px;
        }

        .left {
            display: flex;
        }

        .nav {
            width: 60%;
            display: flex;
            gap: 125px;

            li {
                display: flex;
                align-items: center;
                font-size: 17px;
                height: 50px;
            }
        }
    }
}

@media only screen and (max-width: 821px) {
    .right {
        width: 500px !important;
        .nav {
            li {
                font-size: 15px !important;
            }
        }
    }
}

@media only screen and (max-width: 730px) {
    .right {
        width: 300px !important;
        .nav {
            gap: 55px !important;
            li {
                font-size: 15px !important;
            }
        }
    }
}

@media only screen and (max-width: 630px) {
    .right {
        h4 {
            font-size: 20px !important;
        }
        width: 200px !important;
        .nav {
            gap: 50px !important;
            li {
                font-size: 15px !important;
            }
        }
    }
}

@media only screen and (max-width: 529px) {
    .right {
        h4 {
            font-size: 18px !important;
        }
        width: 200px !important;
        .nav {
            gap: 50px !important;
            li {
                font-size: 15px !important;
            }
        }
    }
}

@media only screen and (max-width: 500px) {
    .right {
        h4 {
            font-size: 13px !important;
        }

        .nav {
            gap: 40px !important;
            li {
                font-size: 13px !important;
            }
        }
    }
}

</style>