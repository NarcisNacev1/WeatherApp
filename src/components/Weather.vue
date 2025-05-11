<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from '../stores/weatherStore';
import AddressDate from './AddressDate.vue';
import SearchBar from './SearchBar.vue';
import Temperature from './Temperature.vue';

const weatherStore = useWeatherStore();

const fetchWeather = (city: string): void => {
    weatherStore.fetchWeather(city);
};

onMounted(() => {
    weatherStore.fetchUserLocation();
});
</script>

<template>
    <div>
        <SearchBar @city-searched="fetchWeather"></SearchBar>
        <Temperature :temperature="weatherStore.temperature"></Temperature>
        <AddressDate
            :address="weatherStore.address"
            :formattedDate="weatherStore.formattedDate"
        ></AddressDate>
    </div>
</template>
