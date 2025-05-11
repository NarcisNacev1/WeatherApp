<script setup lang="ts">
import { computed } from 'vue';
import { useWeatherStore } from "../stores/weatherStore";

const props = defineProps<{
  temperature: number | null;
}>();

const weatherStore = useWeatherStore();

const tempColor = computed(() => {
  if (props.temperature === null) return '#ffffff';

  if (props.temperature >= 30) return '#ff3d00';
  if (props.temperature >= 25) return '#ff9100';
  if (props.temperature >= 15) return '#ffea00';
  if (props.temperature >= 5) return '#76ff03';
  if (props.temperature >= -5) return '#00b0ff';
  return '#2979ff';
});

const tempAnimation = computed(() => {
  const condition = weatherStore.weatherCondition.toLowerCase();

  if (condition.includes('rain') || condition.includes('drizzle')) {
    return 'temp-rain-animation';
  } else if (condition.includes('snow')) {
    return 'temp-snow-animation';
  } else if (condition.includes('thunder') || condition.includes('storm')) {
    return 'temp-storm-animation';
  } else if (condition.includes('clear') || condition.includes('sunny')) {
    return 'temp-sun-animation';
  }

  return '';
});
</script>

<template>
    <div class="temp-container">
        <div class="temp" :class="tempAnimation">
            <h3 :style="{ color: tempColor }">{{ Math.round(temperature || 0) }}<sup>o</sup>C</h3>
            <div v-if="weatherStore.weatherCondition" class="weather-condition">
                {{ weatherStore.weatherCondition }}
            </div>
        </div>

        <div v-if="weatherStore.humidity !== null && weatherStore.windSpeed !== null" class="weather-details">
            <div class="detail-item">
                <span class="detail-icon">💧</span>
                <span class="detail-label">Humidity</span>
                <span class="detail-value">{{ weatherStore.humidity }}%</span>
            </div>
            <div class="detail-item">
                <span class="detail-icon">💨</span>
                <span class="detail-label">Wind</span>
                <span class="detail-value">{{ weatherStore.windSpeed }} km/h</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.temp-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.temp {
    background-color: rgba(0, 0, 0, 0.5);
    width: 200px;
    min-height: 200px;
    border-radius: 15px;
    text-align: center;
    font-size: 50px;
    font-style: italic;
    font-weight: bold;
    color: white;
    padding: 50px 10px 20px;
    margin: 150px auto 0;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
    transition: all 0.5s ease;
    position: relative;
    overflow: hidden;
}

.temp::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    z-index: -1;
    filter: blur(20px);
    transition: all 0.5s ease;
}

.temp h3 {
    margin: 0;
    transition: color 1s ease;
    position: relative;
    z-index: 2;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.weather-condition {
    font-size: 18px;
    margin-top: 10px;
    color: white;
    font-style: normal;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
}

.weather-details {
    display: flex;
    justify-content: center;
    gap: 30px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 15px 25px;
    backdrop-filter: blur(5px);
    color: white;
    margin-bottom: 20px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

.detail-icon {
    font-size: 24px;
}

.detail-label {
    font-size: 14px;
    opacity: 0.8;
}

.detail-value {
    font-size: 18px;
    font-weight: bold;
}

@keyframes temp-glow {
    0%, 100% { box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); }
    50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.8); }
}

@keyframes temp-shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-3px); }
    40%, 80% { transform: translateX(3px); }
}

@keyframes temp-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.temp:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}
</style>