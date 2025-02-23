<template>
    <div class="rating-container flex">
        <h2 class="text-lg font-bold dark:text-white">Community Experiences</h2>
        <div class="rating-list flex">
            <div class="rating-item flex" v-for="comment in commentsList" :key="comment.id">
                <div>
                    <div class="user-info flex">
                        <img :src="comment.avatar" alt="User Avatar" />
                        <div>
                            <div id="name">{{ comment.name }}</div>
                            <div id="postTime">{{ comment.postTime }}</div>
                        </div>
                    </div>
                    <div id="comment">{{ comment.comment }}</div>
                </div>
                <div id="rating">{{ comment.rating }}/5</div>
            </div>
        </div>
    </div>
</template>

<script setup>

import comments from '~/store/comments/CommentsRepository'

const commentsList = ref(comments)

</script>

<style scoped lang="scss">
.rating-container {
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    h2 {
        margin-bottom: 20px;
    }

    .rating-list {
        width: 1080px;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;

        .rating-item {
            justify-content: space-between;
            background: white;
            border-radius: 10px;
            margin: 10px;
            padding: 20px;
            width: 500px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

            .user-info {
                align-items: center;
                gap: 10px;
                margin-bottom: 10px;

                img {
                    width: 40px;
                    height: 40px;
                }
                
                #name {
                    font-weight: bold;
                }

                #postTime {
                    font-size: 0.85rem;
                    color: #777;
                }
            }

            #comment {
                width: 200px;
                font-size: 0.95rem;
                color: #444;
                margin-bottom: 10px;
            }
            
            #rating {
                color: #444;
            }
        }
    }
}

@media only screen and (max-width: 1090px) {
    .rating-list {
        flex-direction: column;
        align-items: center;
    }

    .rating-item {
        width: 90%;
    }
}

@media only screen and (max-width: 525px) {
    .rating-item {
        margin: 0 10px !important;
        width: 300px !important;
    }
}

</style>