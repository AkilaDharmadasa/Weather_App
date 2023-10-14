<template>
  <div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import cityCodes from "../assets/js/cities";


const weatherData = ref([]);
let count = false;
const API_KEY = '67bdb64e899e67757ba44c302ec2a856';


</script>
  
<style lang="scss" scoped></style>
  