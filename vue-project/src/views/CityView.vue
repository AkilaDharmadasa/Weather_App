<template>
    <div>
        <!-- <AsyncCityView /> -->
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <div class="container flex flex-col pt-10 pb-4">
                    Loading City Data ..............
                </div>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AsyncCityView from '../components/AsyncCityView.vue';
import Error from '../components/Error.vue';

const loading = ref(true);

// onMounted(() => {
//     // Simulate an API call or some asynchronous operation
//     setTimeout(() => {
//         loading.value = false; // Set loading to false after 5 seconds
//     }, 5000);
// });
</script>
