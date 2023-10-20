<template>
    <div>
        <div class="container flex flex-col py-10" v-if="isLoading">
            Loading Dashboard ..............
        </div>
        <div class="container flex flex-col py-10" v-else-if="showError">
            <Error />
        </div>
        <div class="container" v-else>
            <main class="flex flex-col gap-2 ">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                    <DashboardCard v-for="city in weatherData" :key="city.id" :cityName=city.name :cityID=city.id
                        :country=city.sys.country :bg=getRandomColorClass() :city=city />

                </div>
            </main>
        </div>
    </div>
</template>
  
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import Error from './Error.vue';
import DashboardCard from './DashboardCard.vue';
import cityCodes from "../assets/js/cities";
import { getDateTime, getTime } from '../assets/js/timeFormatter';

const router = useRouter();
const weatherData = ref([]);

const fetchWeatherData = async () => {
    try {
        const weatherResponses = await Promise.all(
            cityCodes.map(cityCode => {
                return axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`
                    // `http:/api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`

                );
            }),
        );

        weatherData.value = weatherResponses.map(response => {
            const { dt, id, name, weather, main, sys, visibility, wind } = response.data;

            // setting time values
            const formattedTime = getDateTime(dt);
            const formattedsunrise = getTime(sys.sunrise);
            const formattedsunset = getTime(sys.sunset);

            return { dt, id, name, weather, main, sys, visibility, wind, formattedTime, formattedsunrise, formattedsunset };
        });

    } catch (error) {
        showError.value = true;
        console.log('Error fetching weather data:', error);
        //   return "error";
    }
};

// On mount, to fetch the weather data
const showError = ref(false);
const isLoading = ref(true);

onMounted(async () => {
    try {
        // console.log("calling api 8 times");
        await fetchWeatherData();

    } catch (error) {
        console.log(error);
        isLoading.value = false;
        showError.value = true;
    } finally {
        isLoading.value = false;
        // console.log("finally length of weatherData array", weatherData.value.length);
    }
});

// changing the card bg colors
const colorClasses = [
    "bg-weather-bg-blue",
    "bg-weather-bg-purple",
    "bg-weather-bg-green",
    "bg-weather-bg-yellow",
    "bg-weather-bg-red",
];

let randomIndex = 0;
const getRandomColorClass = () => {
    const index = randomIndex;
    randomIndex = (index + 1) % colorClasses.length;
    return colorClasses[index];
};

</script>