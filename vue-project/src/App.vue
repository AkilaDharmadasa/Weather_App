<template>
  <div class="flex flex-col min-h-screen bg-weather-main main-background">
    <SiteNavigation />
    <!-- <WeatherCards /> -->
    <RouterView class="flex-1" v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView>
    <div class="footer bg-black text-white pt-3">
            <p>© 2023 Fidenz Technologies</p>
        </div>
  </div>
  
</template>

<script setup>
  import { RouterView } from 'vue-router';
  import SiteNavigation from "./components/SiteNavigation.vue";
  import WeatherCards from './components/WeatherCards.vue';
  
</script>

<style lang="scss" scoped>
.footer {
    text-align: center;
    margin-top: 20px;
    height: 60px;
}
</style>