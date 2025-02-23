const response = await $fetch('/api/comments', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
})

const comments = response.commentsList

export default comments