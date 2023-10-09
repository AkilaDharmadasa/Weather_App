<template>
  <div>
    <div class="container mx-auto">
      <main class="flex flex-col gap-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            class="city-card bg-weather-secondary text-black hover:text-white transition duration-200 ease-in-out"
            v-for="city in weatherData" :key="city.id" @click="previewCity(city.id)">
            <div class="city-bg">
              <div class="city-temp">
                <h2>
                  {{ city.name }} , {{ city.sys.country }}
                </h2>
                <p style="font-size: x-large; font-weight: bold;">
                  {{ city.main.temp }}°c
                </p>
              </div>
            </div>
            <div class=" bg-weather-data px-6 pt-2 round-bottom ">
              <p class="text-white">
                {{ city.formattedTime }}
              </p>
              <h4 class="text-white">
                City ID: {{ city.id }}
              </h4>
              <p class="text-white">
                Discription: {{ city.weather[0].description }}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import cityCodes from "../cities.js";

const router = useRouter();
const weatherData = ref([]);
const formattedTime = ref('');
let count = false;
const API_KEY = '67bdb64e899e67757ba44c302ec2a856';

console.log(cityCodes);

const fetchWeatherData = async () => {
  try {
    const weatherResponses = await Promise.all(
      cityCodes.map(cityCode => {
        return axios.get(
          `http://api.openweathermap.org/data/2.5/weather?id=${cityCode}&units=metric&appid=${import.meta.env.VITE_APP_API_KEY}`

        );
      }),
    );

    weatherData.value = weatherResponses.map(response => {
      const { dt, id, name, weather, main, sys, } = response.data;

      // cal current date & time
      const localOffset = new Date().getTimezoneOffset() * 60000;
      const utc = dt * 1000 + localOffset;
      const localTime = new Date(utc);

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
      return { dt, id, name, weather, main, sys, formattedTime };
    });

    count = weatherData.value.length > 7;

  } catch (error) {
    console.log('Error fetching weather data:', error);
  }
};

// On mount, to fetch the weather data
onMounted(async () => {
  await fetchWeatherData();

  // for each of the responses
  weatherData.value.forEach((response) => {
    console.log(`dt: ${response.dt}, id: ${response.id}, name: ${response.name}, description: ${response.weather[0].description}, temp: ${response.main.temp}`);
    console.log(count)
  });
});

// check if the weatherData array is not empty
// const isWeatherDataFetched = computed(() => {
//   return count;
// });

const previewCity = (cityID) => {
  console.log(cityID);
  router.push({
    name: "cityView",
    params: { city_id: cityID },
    query: {
      id: cityID,
      preview: true,
    }
  });
};

</script>