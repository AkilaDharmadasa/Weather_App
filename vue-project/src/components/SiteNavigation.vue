<template>
    <header class="sticky top-0 text-5xl bg-slate-700 mb-5">

        <div class="container mx-auto flex flex-col
            items-center gap-4 text-white py-6">
            <div class="hover:text-weather-primary duration-100">
                <RouterLink :to="{ name: 'home' }">
                    <i class="fa-solid fa-cloud-sun"></i>
                    Weather App
                </RouterLink>
            </div>
        </div>

    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
