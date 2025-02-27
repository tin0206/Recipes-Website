const fetchComments = async () => {
    return await $fetch('/api/comments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const getComments = async () => {
    const response = await fetchComments()
    return response.commentsList
}