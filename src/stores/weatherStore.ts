import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useWeatherStore = defineStore('weather', () => {
    const temperature = ref<number | null>(null);
    const address = ref<string | undefined>(undefined);
    const date = ref<string | null>(null);
    const city = ref<string>('');
    const weatherCondition = ref<string>('');
    const humidity = ref<number | null>(null);
    const windSpeed = ref<number | null>(null);
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);
    const forecast = ref<any[]>([]);

    const formattedDate = computed<string>(() => {
        if (date.value) {
            const dateObj = new Date(date.value);
            const months: string[] = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            ];
            const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

            const month = months[dateObj.getMonth()];
            const day = dateObj.getDate();
            const year = dateObj.getFullYear();
            const weekday = days[dateObj.getDay()];

            return `${month} ${day} ${year}, ${weekday}`;
        }
        return '';
    });

    const backgroundVideo = computed<string>(() => {
        if (!weatherCondition.value) return 'default';

        const condition = weatherCondition.value.toLowerCase();
        const temp = temperature.value || 0;

        if (condition.includes('thunder') || condition.includes('storm')) return 'storm';
        if (condition.includes('snow')) return 'snow';
        if (condition.includes('rain') || condition.includes('drizzle')) return 'rain';
        if (condition.includes('fog') || condition.includes('mist')) return 'fog';
        if (condition.includes('cloud')) return 'cloudy';

        if (condition.includes('clear') || condition.includes('sunny')) {
            if (temp >= 30) return 'hot';
            if (temp <= 0) return 'cold-clear';
            return timeOfDay.value === 'night' ? 'night-clear' : 'day-clear';
        }

        return 'default';
    });

    const temperatureClass = computed<string>(() => {
        if (temperature.value === null) return 'temp-normal';

        if (temperature.value >= 30) return 'temp-very-hot';
        if (temperature.value >= 25) return 'temp-hot';
        if (temperature.value >= 15) return 'temp-warm';
        if (temperature.value >= 5) return 'temp-cool';
        if (temperature.value >= -5) return 'temp-cold';
        return 'temp-very-cold';
    });

    const timeOfDay = computed<string>(() => {
        if (!date.value) return 'day';

        const dateObj = new Date(date.value);
        const hours = dateObj.getHours();

        if (hours >= 5 && hours < 8) return 'dawn';
        if (hours >= 8 && hours < 18) return 'day';
        if (hours >= 18 && hours < 21) return 'dusk';
        return 'night';
    });

    const weatherAnimation = computed<string>(() => {
        if (!weatherCondition.value) return 'weather-default';

        const condition = weatherCondition.value.toLowerCase();

        if (condition.includes('rain') || condition.includes('drizzle')) {
            return 'weather-rain';
        } else if (condition.includes('snow')) {
            return 'weather-snow';
        } else if (condition.includes('thunder') || condition.includes('storm')) {
            return 'weather-storm';
        } else if (condition.includes('clear') || condition.includes('sunny')) {
            return 'weather-sunny';
        } else if (condition.includes('cloud')) {
            return 'weather-cloudy';
        } else if (condition.includes('fog') || condition.includes('mist')) {
            return 'weather-fog';
        }

        return 'weather-default';
    });

    const fetchWeather = async (city: string): Promise<void> => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
                params: {
                    q: city,
                    days: 3,
                },
                headers: {
                    'X-RapidAPI-Key': '9aa7e4b2d9msh6a2d904b3b7c8d6p188a89jsn9033df5576a6',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                },
            });

            temperature.value = response.data.current.temp_c;
            address.value = response.data.location.name + ', ' + response.data.location.country;
            date.value = response.data.location.localtime;

            weatherCondition.value = response.data.current.condition.text;
            humidity.value = response.data.current.humidity;
            windSpeed.value = response.data.current.wind_kph;

            forecast.value = response.data.forecast.forecastday.map((day: any) => ({
                date: day.date,
                maxTemp: Math.round(day.day.maxtemp_c),
                minTemp: Math.round(day.day.mintemp_c),
                condition: day.day.condition.text,
                icon: day.day.condition.icon,
                chanceOfRain: day.day.daily_chance_of_rain,
            }));

        } catch (error) {
            console.error(error);
        } finally {
            isLoading.value = false;
        }
    };

    const fetchUserLocation = (): void => {
        isLoading.value = true;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchUserCity(latitude, longitude);
                },
                (error) => {
                    console.error(error.message);
                    isLoading.value = false;
                },
            );
        } else {
            console.error('Geolocation is not supported');
            isLoading.value = false;
        }
    };

    const fetchUserCity = async (latitude: number, longitude: number): Promise<void> => {
        const apiKey = 'ec59eced5482443ea5d121030251902';

        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`,
            );
            const city = response.data.results[0].components.city;
            fetchWeather(city);
        } catch (error) {
            console.error(error);
            isLoading.value = false;
        }
    };

    return {
        temperature,
        address,
        date,
        formattedDate,
        city,
        weatherCondition,
        humidity,
        windSpeed,
        isLoading,
        error,
        forecast,
        backgroundVideo,
        temperatureClass,
        timeOfDay,
        weatherAnimation,
        fetchWeather,
        fetchUserLocation,
        fetchUserCity,
    };
});