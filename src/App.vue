<script setup lang="ts">
import Weather from './components/Weather.vue';
</script>

<template>
    <div class="main">
        <Weather />
    </div>
</template>

<style>
.main {
    background-image: url(./assets/blue.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    height: 100vh;
}
</style>