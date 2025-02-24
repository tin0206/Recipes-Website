const response = await $fetch('/api/recipes', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})

const recipes = response.recipes.sort((a, b) => a.name.localeCompare(b.name))

export default recipes