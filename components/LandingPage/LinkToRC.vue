<template>
    <div>
        <NuxtLink to="/RecipeCollection" class="text-black dark:text-white link"><span>View All Recipes</span></NuxtLink>
    </div>
</template>

<style scoped lang="scss">
div {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .link {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #636ae8;
        border: 2px solid #636ae8;
        border-radius: 10px;
        width: 150px;
        span {
            color: white;
        }
    }
}
</style>