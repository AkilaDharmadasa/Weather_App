<template>
    <div class="container flex flex-col pt-10 pb-4" v-if="weatherData != 'error'">
        <div class="weather-app bg-weather-city">
            <div class="container flex flex-col
            items-center gap-4 text-white py-2 text-2xl">
                <p>{{ weatherData.name }}, {{ weatherData.sys.country }}</p>
            </div>

            <div class="container flex flex-col 
            items-center gap-4 text-white text-md">
                <p>{{ formattedTime }}</p>
            </div>

            <div class="current-conditions">
                <hr class=" border-white border-opacity-200 border w-56 " />
            </div>

            <div class="gap-4 my-6">
                <div class="flex flex-row pb-5 content-center justify-stretch justify-items-center">
                    <div class="grid-cols-6 flex flex-col items-center justify-items-center border-r-2 w-6/12">
                        <img :src="iconUrl" class="city-card2 bg-blue-400 hover:bg-opacity-50 transition 
                        duration-200 ease-in-out hover:backdrop-blur-blur" />
                        <div class="text-xl flex flex-col items-center text-center">
                            {{ weatherData.weather[0].description }}
                        </div>
                    </div>

                    <div class="grid-cols-6 flex flex-col items-center justify-center w-6/12 text-4xl text-white">
                        {{ Math.round(weatherData.main.temp) }}°C
                    </div>

                </div>
                <div class="current-conditions pt-5">
                    <hr class=" border-white border-opacity-100 border w-4/5 " />
                </div>
            </div>
        </div>
        <div class="forecast py-4 bg-weather-data text-white text-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <div class="flex border-r-0 sm:border-r-2">Temp Min: {{ weatherData.main.temp_min }}°c</div>
            <div class="flex border-r-0 md:border-r-2 sm:border-r-0">Temp Max: {{ weatherData.main.temp_min }}°c</div>
            <div class="hidden border-r-0 sm:border-r-2 md:flex">Pressure: {{ weatherData.main.pressure }}hPa</div>
            <div class="flex border-r-0 sm:border-r-2">Humidity: {{ weatherData.main.humidity }}%</div>
            <div class="flex border-r-0 sm:border-r-2">Visibility: {{ weatherData.visibility }}</div>
            <div class="flex border-r-0 md:border-r-2 sm:border-r-0">Wind: {{ weatherData.wind.speed }}m/s {{
                weatherData.wind.deg }}°</div>
            <div class="flex border-r-0 sm:border-r-2">Sunrise: {{ formattedsunrise }}</div>
            <div class="flex border-r-0 sm:border-r-2">Sunset: {{ formattedsunset }}</div>
        </div>
    </div>
    <div class="container flex flex-col py-10" v-else>
        404 ERROR
    </div>
</template>

<script>

</script>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import swal from 'Sweetalert2'


const time = ref(new Date().toLocaleTimeString());
const formattedTime = ref('');
const formattedsunrise = ref('');
const formattedsunset = ref('');

const route = useRoute();
const cityId = route.query.id;

const getWeatherData = async (id_1) => {

    try {
        const weatherData = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?id=${id_1}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`
            // `http:/api.openweathermap.org/data/2.5/weather?id=${route.query.id}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`
        );

        console.log(weatherData.status)

        if (weatherData.status == 200) {
            // // cal current date & time
            const localOffset = new Date().getTimezoneOffset() * 60000;
            const utc = weatherData.data.dt * 1000 + localOffset;
            const localTime = new Date(utc);

            // sunrise
            const localOffset_sunrise = new Date().getTimezoneOffset() * 60000;
            const utc_sunrise = weatherData.data.sys.sunrise * 1000 + localOffset_sunrise;
            const localTime_sunrise = new Date(utc_sunrise);

            // sunset
            const localOffset_sunset = new Date().getTimezoneOffset() * 60000;
            const utc_sunset = weatherData.data.sys.sunset * 1000 + localOffset_sunset;
            const localTime_sunset = new Date(utc_sunset);

            // Update the formattedTime ref with the local time
            const istFormatter = new Intl.DateTimeFormat('en-IN', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            });
            formattedTime.value = istFormatter.format(localTime);

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

            return weatherData.data;
        } else {
            console.log("API error");
        }

    } catch (err) {
        console.log(err);
        // swal.fire("hello world");
        // return "error";
    }
};

const weatherData = await getWeatherData(route.query.id);
let iconUrl = "";
if (weatherData != "error") {
    iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
}

</script>

<style lang="scss" scoped></style>
