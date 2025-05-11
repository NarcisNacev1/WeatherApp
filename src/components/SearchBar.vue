<script setup lang="ts">
import { useWeatherStore } from '../stores/weatherStore.ts';
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'city-searched', city: string): void
}>();

const weatherStore = useWeatherStore();
const isSearchFocused = ref(false);

const searchCity = (): void => {
  if (weatherStore.city.trim()) {
    emit('city-searched', weatherStore.city);
  }
};

const handleKeyDown = (event: KeyboardEvent): void => {
  if (event.key === 'Enter') {
    searchCity();
  }
};

const getCurrentLocation = (): void => {
  weatherStore.fetchUserLocation();
};
</script>

<template>
    <div class="search-container" :class="{ 'loading': weatherStore.isLoading }">
        <div class="city" :class="{ 'focused': isSearchFocused }">
            <div class="search-icon" @click="getCurrentLocation" title="Use current location">
                <svg xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                >
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12"
                          y1="8"
                          x2="12"
                          y2="12"
                    />
                    <line x1="12"
                          y1="16"
                          x2="12.01"
                          y2="16"
                    />
                </svg>
            </div>
            <input
                type="text"
                id="search"
                v-model="weatherStore.city"
                placeholder="Search city..."
                @focus="isSearchFocused = true"
                @blur="isSearchFocused = false"
                @keydown="handleKeyDown"
            >
            <div class="search-button" @click="searchCity" :class="{ 'active': weatherStore.city.trim() }">
                <svg v-if="!weatherStore.isLoading"
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                >
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21"
                          y1="21"
                          x2="16.65"
                          y2="16.65"
                    />
                </svg>

                <svg v-else
                     class="animate-spin"
                     xmlns="http://www.w3.org/2000/svg"
                     width="24"
                     height="24"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                     stroke-width="2"
                     stroke-linecap="round"
                     stroke-linejoin="round"
                >
                    <line x1="12"
                          y1="2"
                          x2="12"
                          y2="6"
                    />
                    <line x1="12"
                          y1="18"
                          x2="12"
                          y2="22"
                    />
                    <line x1="4.93"
                          y1="4.93"
                          x2="7.76"
                          y2="7.76"
                    />
                    <line x1="16.24"
                          y1="16.24"
                          x2="19.07"
                          y2="19.07"
                    />
                    <line x1="2"
                          y1="12"
                          x2="6"
                          y2="12"
                    />
                    <line x1="18"
                          y1="12"
                          x2="22"
                          y2="12"
                    />
                    <line x1="4.93"
                          y1="19.07"
                          x2="7.76"
                          y2="16.24"
                    />
                    <line x1="16.24"
                          y1="7.76"
                          x2="19.07"
                          y2="4.93"
                    />
                </svg>
            </div>
        </div>

        <div v-if="weatherStore.error" class="error-message">
            {{ weatherStore.error }}
        </div>
    </div>
</template>

<style scoped>
.search-container {
    width: 100%;
    max-width: 500px;
    padding-top: 50px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.city {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: all 0.3s ease;
}

.search-icon {
    position: absolute;
    left: 15px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;
}

.search-icon:hover {
    color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
}

input {
    border: 0;
    outline: 0;
    background-color: rgba(0, 0, 0, 0.40);
    border-radius: 50px;
    padding: 14px 55px;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    color: white;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
}

input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.city.focused input {
    background-color: rgba(0, 0, 0, 0.50);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-2px);
}

.search-button {
    position: absolute;
    right: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s ease;
}

.search-button:hover, .search-button.active {
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    transform: scale(1.05);
}

.error-message {
    margin-top: 10px;
    color: #ff6b6b;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 14px;
}

.loading input {
    opacity: 0.8;
}

@keyframes spin {
    from {transform: rotate(0deg);}
    to {transform: rotate(360deg);}
}

.animate-spin {
    animation: spin 1.5s linear infinite;
}
</style>