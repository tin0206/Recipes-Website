<template>
    <Topbar />
    <div class="display">
        <slot />
    </div>
</template>

<script setup>

import Topbar from '~/components/Topbar.vue'

</script>

<style scoped lang="scss">
.display {
    margin-top: 30px;
    @media (min-width: 768px) {
        margin-left: 50px;
        margin-right: 20px;
    }
}
</style>