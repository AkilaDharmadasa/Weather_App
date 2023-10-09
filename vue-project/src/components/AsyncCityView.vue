<template>
    <div class="container mx-auto py-10">
        <div class="weather-app bg-weather-city">
            <div class="container mx-auto flex flex-col
            items-center gap-4 text-white py-2 text-2xl">
                <p>{{ weatherData.name }}, {{ weatherData.sys.country }}</p>
            </div>

            <div class="container mx-auto flex flex-col 
            items-center gap-4 text-white text-md">
                <p>{{ formattedTime }}</p>
            </div>

            <div class="current-conditions px-60">
                <hr class=" border-white border-opacity-200 border w-full " />
            </div>

            <div class="body flex flex-col gap-4">
                <div class="grid grid-cols-2 sm:grid-cols-3 gap-10 px-24 pb-5 items-center ">
                    <div class=" flex flex-col items-center justify-center m-5">
                        <img :src="iconUrl" class="city-card2 bg-blue-400 hover:bg-opacity-50 transition 
                        duration-200 ease-in-out hover:backdrop-blur-blur w-32 flex flex-col items-center justify-center" />
                        <div class="text-xl flex flex-col items-center justify-center w-32">
                            {{ weatherData.weather[0].description }}
                        </div>
                    </div>

                    <!-- <img src="../assets/images/could1.png" alt="Weather icon"> -->
                    <!-- <div class="vertical-line"></div> -->
                    <div class="flex flex-col items-center justify-center">
                        <div class="vertical-line"></div>
                    </div>

                    <!-- <div class="vertical-line"></div> -->
                    <div class="flex flex-col items-center justify-center w-36 text-4xl text-white">
                        {{ weatherData.main.temp }}°C
                    </div>

                </div>
                <div class="current-conditions px-20">
                    <hr class=" border-white border-opacity-200 border-2 w-full " />
                </div>
            </div>
        </div>
        <div class="forecast py-4 bg-weather-data text-white text-lg">
            <ul>
                <li>Temp Min: {{ weatherData.main.temp_min }}°c</li>
                <li>Temp Max: {{ weatherData.main.temp_min }}°c</li>
                <li>Pressure: {{ weatherData.main.pressure }}hPa</li>
                <li>Humidity: {{ weatherData.main.humidity }}%</li>
                <li>Visibility: {{ weatherData.visibility }}</li>
                <li>Wind: {{ weatherData.wind.speed }}m/s {{ weatherData.wind.deg }}°</li>
                <li>Sunrise: {{ formattedsunrise }}</li>
                <li>Sunset: {{ formattedsunset }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const time = ref(new Date().toLocaleTimeString());
const formattedTime = ref('');
const formattedsunrise = ref('');
const formattedsunset = ref('');
// const time = ref(new Date().toLocaleTimeString());
// setInterval(() => {
//     time.value = new Date().toLocaleTimeString();
// }, 1000);

const route = useRoute();

const cityId = route.query.id;
console.log(cityId);

const getWeatherData = async () => {

    try {
        const weatherData = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?id=${route.query.id}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`
        );

        console.log(weatherData.data)

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

    } catch (err) {
        console.log(err);
    }
};

const weatherData = await getWeatherData();
console.log(weatherData);
const iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
console.log(iconUrl);

</script>

<style lang="scss" scoped>
.container {
    max-width: 800px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
}

.weather-app {
    padding: 20px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    box-shadow: 0 2px 4px rgba(13, 13, 13, 0.4);
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.body {
    margin-top: 10px;
}

.current-conditions {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.current-conditions img {
    width: 100px;
    height: 100px;
}

.forecast {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
}

.forecast ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1px;
}

.forecast li {
    border-right: 1px solid white;
    margin-left: 2rem;
}

.forecast li:last-child {
    border-right: none;
}

.forecast li:nth-child(4) {
    border-right: none;
}

.vertical-line {
    border: solid 1px;
    height: 5rem;
    border-color: white;
}
</style>
