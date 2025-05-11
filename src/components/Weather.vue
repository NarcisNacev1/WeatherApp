<template>
    <div>
        <SearchBar @city-searched="fetchWeather"></SearchBar>
        <Temperature :temperature="temperature"></Temperature>
        <AddressDate :formattedDate="formattedDate"></AddressDate>
    </div>
</template>

<script>
import AddressDate from './AddressDate.vue';
import SearchBar from './SearchBar.vue';
import Temperature from './Temperature.vue';

import axios from "axios";

export default {
    components: { AddressDate, SearchBar, Temperature },
    data() {
        return {
            temperature: null,
            address: null,
            date: null
        }
    },

    computed: {
        formattedDate() {
            if (this.date) {
                const dateObj = new Date(this.date);
                const months = [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                const month = months[dateObj.getMonth()];
                const day = dateObj.getDate();
                const year = dateObj.getFullYear();
                const weekday = days[dateObj.getDay()];

                const formatted = `${month} ${day} ${year}, ${weekday}`;
                return formatted;
            }
            return "";
        },
    },

    methods: {
        fetchWeather(city) {
            axios
                .get("https://weatherapi-com.p.rapidapi.com/forecast.json", {
                    params: {
                        q: city,
                        days: 3,
                    },
                    headers: {
                        "X-RapidAPI-Key":
                            "9aa7e4b2d9msh6a2d904b3b7c8d6p188a89jsn9033df5576a6",
                        "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
                        
// api.weatherapi.com/v1                  
  },
                })
                .then((response) => {
                    this.temperature = response.data.current.temp_c;

                    this.address =
                        response.data.location.name + ", " + response.data.location.country;
                    this.date = response.data.location.localtime;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fetchUserLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        this.fetchUserCity(latitude, longitude);
                    },
                    (error) => {

                        console.error(error.message);
                    }
                );
            } else {

                console.error("Geolocation is not supported");
            }
        },
        fetchUserCity(latitude, longitude) {
            const apiKey = "ec59eced5482443ea5d121030251902";

            axios
                .get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}${longitude}&key=${apiKey}`)
                .then((response) => {
                    const city = response.data.results[0].components.city;
                    this.fetchWeather(city);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    },
    created() {

        this.fetchUserLocation();
    }
}
</script>

<style></style>