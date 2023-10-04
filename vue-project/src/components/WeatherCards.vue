<template>
  <div>
    <div class="container mx-auto">
      <main class="flex flex-col gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="city-card bg-weather-secondary" v-for="city in weatherData" :key="city.id">
            <h2>
              {{ city.name }}
            </h2>
            <p>
              {{ city.weather[0].description }}
            </p>
            <p>
              {{ city.main.temp }}°c
            </p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import cityCodes from "../cities.js";


const weatherData = ref([]);
let count = false;
const API_KEY = '67bdb64e899e67757ba44c302ec2a856';

console.log(cityCodes);

const fetchWeatherData = async () => {
    try {
        const weatherResponses = await Promise.all(
            cityCodes.map(cityCode => {
                return axios.get(
                    `http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=67bdb64e899e67757ba44c302ec2a856`

                );
            })
        );

        

        weatherData.value = weatherResponses.map(response => {
            const { dt, id, name, weather, main } = response.data;
            return { dt, id, name, weather, main };
        });

        count = weatherData.value.length > 7;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
};

// On mount, fetch the weather data
onMounted(async () => {
    await fetchWeatherData();

    // Console log the data for each of the responses
    weatherData.value.forEach((response) => {
        console.log(`dt: ${response.dt}, id: ${response.id}, name: ${response.name}, description: ${response.weather[0].description}, temp: ${response.main.temp}`);
        console.log(count)
    });
});

// Computed property that checks if the weatherData array is not empty
// const isWeatherDataFetched = computed(() => {
//   return count;
// });

</script>

<style lang="scss" scoped></style>
