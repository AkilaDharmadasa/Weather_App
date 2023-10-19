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

            // cal current date & time
            const localOffset = new Date().getTimezoneOffset() * 60000;
            const utc = dt * 1000 + localOffset;
            const localTime = new Date(utc);

            // sunrise
            const utc_sunrise = sys.sunrise * 1000 + localOffset;
            const localTime_sunrise = new Date(utc_sunrise);

            // sunset
            const utc_sunset = sys.sunset * 1000 + localOffset;
            const localTime_sunset = new Date(utc_sunset);

            const formattedTime = ref('');
            const formattedsunrise = ref('');
            const formattedsunset = ref('');

            // Update the formattedTime ref with the local time
            formattedTime.value = localTime.toLocaleTimeString('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });


            formattedTime.value += `, ${localTime.toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
            })}`;

            // Update the formattedsunrise ref with the local time
            formattedsunrise.value = localTime_sunrise.toLocaleTimeString('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });

            // Update the formattedsunset ref with the local time
            formattedsunset.value = localTime_sunset.toLocaleTimeString('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });

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
        console.log(isLoading.value);
        // console.log("finally length of weatherData array", weatherData.value.length);
    }
});

// at click of a city card to route to city view
const previewCity = (cityID) => {
    // console.log(cityID);
    router.push({
        name: "cityView",
        params: { city_id: cityID },
        query: {
            id: cityID,
            preview: true,
        }
    });
};

const colorClasses = [
    "bg-weather-bg-blue",
    "bg-weather-bg-purple",
    "bg-weather-bg-green",
    "bg-weather-bg-yellow",
    "bg-weather-bg-red",
];

const randomIndex = ref(0);
const getRandomColorClass = () => {
    const index = randomIndex.value;
    randomIndex.value = (index + 1) % colorClasses.length;
    return colorClasses[index];
};

</script>