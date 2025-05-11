<script setup lang="ts">
import { AddressDateProps } from "../interfaces/addresses.Interface.ts";
import { useWeatherStore } from "../stores/weatherStore";

defineProps<AddressDateProps>();
const weatherStore = useWeatherStore();
</script>

<template>
    <div class="address-date-container" :class="weatherStore.weatherAnimation">
        <div class="address"><span>{{ address }}</span></div>
        <div class="date"><span>{{ formattedDate }}</span></div>

        <div v-if="weatherStore.forecast && weatherStore.forecast.length > 0" class="forecast-container">
            <h3>3-Day Forecast</h3>
            <div class="forecast-cards">
                <div v-for="(day, index) in weatherStore.forecast" :key="index" class="forecast-card">
                    <div class="forecast-day">{{ new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }) }}</div>
                    <div class="forecast-temp">
                        <span class="max-temp">{{ day.maxTemp }}°</span> /
                        <span class="min-temp">{{ day.minTemp }}°</span>
                    </div>
                    <div class="forecast-condition">{{ day.condition }}</div>
                    <div v-if="day.chanceOfRain > 0" class="forecast-rain">💧 {{ day.chanceOfRain }}%</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.address-date-container {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 20px;
    backdrop-filter: blur(8px);
    max-width: 600px;
    margin: 0 auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    transition: all 0.5s ease;
}

div {
    color: rgb(251, 251, 251);
}

.address {
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 5px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
}

.date {
    font-size: 22px;
    width: 100%;
    font-style: italic;
    text-align: center;
    margin: 0 auto 30px;
    opacity: 0.8;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.forecast-container {
    margin-top: 20px;
    text-align: center;
}

.forecast-container h3 {
    font-size: 22px;
    margin-bottom: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.forecast-cards {
    display: flex;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
}

.forecast-card {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 15px;
    min-width: 120px;
    transition: all 0.3s ease;
}

.forecast-card:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-5px);
}

.forecast-day {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
}

.forecast-temp {
    margin: 10px 0;
}

.max-temp {
    font-weight: bold;
    font-size: 18px;
}

.min-temp {
    opacity: 0.7;
}

.forecast-condition {
    font-size: 14px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.forecast-rain {
    font-size: 14px;
    opacity: 0.9;
    color: #a0d2eb;
}

@keyframes subtle-shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
}

@keyframes subtle-flash {
    0%, 90%, 100% { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); }
    95% { box-shadow: 0 10px 30px rgba(255, 255, 255, 0.4); }
}
</style>