import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useWeatherStore = defineStore('weather', () => {
    const temperature = ref<number | null>(null);
    const address = ref<string | undefined>(undefined);
    const date = ref<string | null>(null);
    const city = ref<string>('');

    const formattedDate = computed<string>(() => {
        if (date.value) {
            const dateObj = new Date(date.value);
            const months: string[] = [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
            ];
            const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

            const month = months[dateObj.getMonth()];
            const day = dateObj.getDate();
            const year = dateObj.getFullYear();
            const weekday = days[dateObj.getDay()];

            return `${month} ${day} ${year}, ${weekday}`;
        }
        return "";
    });

    const fetchWeather = async (city: string): Promise<void> => {
        try {
            const response = await axios.get("https://weatherapi-com.p.rapidapi.com/forecast.json", {
                params: {
                    q: city,
                    days: 3,
                },
                headers: {
                    "X-RapidAPI-Key": "9aa7e4b2d9msh6a2d904b3b7c8d6p188a89jsn9033df5576a6",
                    "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
                },
            });

            temperature.value = response.data.current.temp_c;
            address.value = response.data.location.name + ", " + response.data.location.country;
            date.value = response.data.location.localtime;
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUserLocation = (): void => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchUserCity(latitude, longitude);
                },
                (error) => {
                    console.error(error.message);
                }
            );
        } else {
            console.error("Geolocation is not supported");
        }
    };

    const fetchUserCity = async (latitude: number, longitude: number): Promise<void> => {
        const apiKey = "ec59eced5482443ea5d121030251902";

        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}${longitude}&key=${apiKey}`
            );
            const city = response.data.results[0].components.city;
            fetchWeather(city);
        } catch (error) {
            console.log(error);
        }
    };


    return {
        temperature,
        address,
        date,
        formattedDate,
        city,
        fetchWeather,
        fetchUserLocation,
        fetchUserCity
    };
});