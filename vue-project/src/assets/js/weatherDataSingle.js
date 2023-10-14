import axios from 'axios';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import swal from './Sweetalert2'


const time = ref(new Date().toLocaleTimeString());
const formattedTime = ref('');
const formattedsunrise = ref('');
const formattedsunset = ref('');

const route = useRoute();

const cityId = route.query.id;
// console.log(cityId);

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
        console.log("error", err.message);
        console.log(err);
        // swal.fire("hello world");
        // return "error";
    }
};

const weatherData = await getWeatherData(route.query.id);
console.log("weather Data return = ", weatherData);
let iconUrl = "";
if (weatherData != "error"){
    iconUrl = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
}
