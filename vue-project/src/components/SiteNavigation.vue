<template>
    <header class="sticky top-0 text-5xl bg-slate-700 mb-5">

        <div class="container mx-auto gap-4 text-white py-6">
            <div class="hover:text-weather-primary duration-100 flex flex-col items-center text-3xl">
                <RouterLink :to="{ name: 'home' }">
                    <div class="flex flex-row">
                        <i class="fa-solid fa-cloud-sun"></i>
                        <div class="flex ml-1">
                            Weather App
                        </div>
                    </div>
                </RouterLink>
            </div>
        </div>

    </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>
