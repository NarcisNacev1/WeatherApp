<script setup lang="ts">
import { useWeatherStore } from "../stores/weatherStore.ts";

const emit = defineEmits<{
    (e: 'city-searched', city: string): void
}>();

const searchCity = (): void => {
    emit('city-searched', weatherStore.city);
};

const weatherStore = useWeatherStore();
</script>

<template>
    <div class="city">
        <input type="text" id="search" v-model="weatherStore.city" placeholder="search city..">
        <img src="../assets/search.png" alt="search-icon" style="width: 30px;" @click="searchCity">
    </div>
</template>

<style scoped>
.city {
    width: 500px;
    margin: 0px auto;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;
}

.city img {
    position: relative;
    right: 50px;
    cursor: pointer;
}

input {
    border: 0;
    outline: 0;
    background-color: rgba(0, 0, 0, 0.40);
    border-radius: 5px;
    padding: 10px 20px;
    width: 80%;
    font-size: 25px;
    font-weight: 700;
    color: white;
    box-shadow: -5px 7px rgba(0, 0, 0, 0.2);
}
</style>