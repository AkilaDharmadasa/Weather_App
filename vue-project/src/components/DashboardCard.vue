<template>
    <!-- <div class="city-card text-black hover:text-white transition duration-200 ease-in-out"
    @click="previewCity(cityID)" :class="bg">
</div> -->
    <div class="city-card text-black hover:text-white transition duration-200 ease-in-out" @click="previewCity(cityID)"
        :class="bg">
        <div class="city-bg flex flex-col justify-between">
            <div class="flex flex-row content-center justify-stretch justify-items-center">
                <div class="grid-cols-6 flex flex-col items-center justify-items-center w-6/12">
                    <div class="font-bold">
                        {{ city.name }} , {{ city.sys.country }}
                    </div>
                    <div style="font-size: 0.65rem;">
                        {{ city.formattedTime }}
                    </div>
                </div>
                <div class="grid-cols-6 flex flex-col items-center justify-items-center w-6/12 text-3xl"
                    style="font-weight: bold;">
                    {{ Math.round(city.main.temp) }}°c
                </div>
            </div>
            <div class="flex flex-row pb-5 content-center justify-stretch justify-items-center">
                <div class="grid-cols-6 flex flex-col items-center justify-items-center w-6/12 font-semibold pt-2">
                    {{ city.weather[0].main }}
                </div>
                <div class="grid-cols-6 flex flex-col items-center justify-items-center w-6/12" style="font-size: small;">
                    <div>
                        <span class="font-bold">Temp Min : </span>{{ Math.round(city.main.temp_min) }}°c
                    </div>
                    <div>
                        <span class="font-bold">Temp Max : </span>{{ Math.round(city.main.temp_max) }}°c
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-weather-data px-2 py-2 round-bottom grid grid-cols-3" style="font-size: 1rem;">
            <div class="text-white border-r-2 flex items-start justify-center ">
                <span style="font-size: 0.65rem;" class="font-bold mr-1">Presure :</span>
                <span style="font-size: 0.65rem;">{{ city.main.pressure }} hPa</span>
            </div>
            <div class="text-white border-r-2 flex items-start justify-center py-1">
                <i class="fa-solid fa-location-arrow"></i>
            </div>
            <div class="text-white border-r-0 flex items-start justify-center py-1">
                <span style="font-size: 0.65rem;" class="font-bold mr-1">Sunrise :</span>
                <span style="font-size: 0.65rem;">{{ city.formattedsunrise }} </span>
            </div>
            <div class="text-white border-r-2 flex items-start justify-center">
                <span style="font-size: 0.65rem;" class="font-bold mr-1">Humidity :</span>
                <span style="font-size: 0.65rem;">{{ city.main.humidity }}%</span>
            </div>
            <div class="text-white border-r-2 flex items-start justify-center py-1">
                <span style="font-size: 0.65rem;">{{ city.wind.speed }}m/s {{ city.wind.ded }}Degree</span>
            </div>
            <div class="text-white border-r-0 flex items-start justify-center py-1">
                <span style="font-size: 0.65rem;" class="font-bold mr-1">Sunset :</span>
                <span style="font-size: 0.65rem;">{{ city.formattedsunset }} </span>
            </div>
            <div class="text-white border-r-0 flex items-start justify-center">
                <span style="font-size: 0.65rem;" class="font-bold mr-1">Visibility :</span>
                <span style="font-size: 0.65rem;">{{ city.visibility }}m</span>
            </div>

        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
export default {

    props: ['cityID', 'country', 'bg', 'city'],
    methods: {
        previewCity(key) {
            this.$router.push({
                name: "cityView",
                params: { city_id: key },
                query: {
                    id: key,
                    preview: true,
                }
            });
        }
    }
};
</script>
  