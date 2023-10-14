<template>
  <div>
    <Suspense>
      <Dashboard />
      <template #fallback>
        <template v-if="loading">
          <p>Loading......</p>
        </template>
        <template v-else>
          <p>404 Error: Resource not found.</p>
        </template>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Dashboard from '../components/Dashboard.vue';

const loading = ref(true);

onMounted(() => {
  // Simulate an API call or some asynchronous operation
  setTimeout(() => {
    loading.value = false; // Set loading to false after 5 seconds
  }, 5000);
});
</script>
