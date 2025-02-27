const fetchRecipes = async () => {
    return await $fetch('/api/recipes', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getRecipes = async () => {
    const response = await fetchRecipes()
    return response.recipes
}