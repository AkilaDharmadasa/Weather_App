<template>
    <div>
        <!-- <AsyncCityView /> -->
        <Suspense>
            <AsyncCityView />
            <template #fallback>
                <template v-if="loading">
                    <p>Loading......</p>
                </template>
                <template v-else>
                    <Error />

                </template>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AsyncCityView from '../components/AsyncCityView.vue';
import Error from '../components/Error.vue';

const loading = ref(true);

onMounted(() => {
    // Simulate an API call or some asynchronous operation
    setTimeout(() => {
        loading.value = false; // Set loading to false after 5 seconds
    }, 2000);
});
</script>
