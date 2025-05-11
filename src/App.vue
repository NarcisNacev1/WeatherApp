<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from './stores/weatherStore';
import Weather from "./components/Weather.vue";

const weatherStore = useWeatherStore();

const currentVideo = computed(() => {
const videoName = weatherStore.backgroundVideo;
return new URL(`./assets/videos/${videoName}.mp4`, import.meta.url).href;
});
</script>

<template>
    <div class="main-container">
        <video
            class="background-video"
            :src="currentVideo"
            autoplay
            muted
            loop
            :key="weatherStore.backgroundVideo"
        ></video>
        <div class="content-overlay">
            <Weather />
        </div>
    </div>
</template>

<style>
.main-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.background-video {
    position: fixed;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
    object-fit: cover;
    transition: opacity 1s ease-in-out;
}

.content-overlay {
    position: relative;
    z-index: 1;
    background: rgba(0, 0, 0, 0.4);
    min-height: 100vh;
}
</style>