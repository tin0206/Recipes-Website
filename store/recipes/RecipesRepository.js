const response = await $fetch('/api/recipes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})

const recipes = response.recipes

export default recipes