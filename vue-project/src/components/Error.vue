<template>
    <div class="container mx-auto flex flex-col justify-center items-center py-10">
        <div class="error-box bg-weather-city w-full max-w-md flex flex-col justify-center items-center py-10 px-5">
            <h1 class="text-rose-200 text-3xl">ERROR!</h1>
            <p class="text-xl">Oops! Something went Wrong.</p>
            <div class="flex flex-row justify-center items-center mt-5">
                <div class="error-404-illustration w-32 h-32">
                    <img src="../assets/images/cloud_error.jpeg" alt="404 Illustration">
                </div>
                <button class="btn hover:bg-weather-data bg-weather-main p-1 text-white text-sm
          ml-5 rounded-sm shadow-sm" @click="$router.go(0)">Refresh Page</button>
            </div>
        </div>
    </div>
</template>
  
<script setup>

</script>
  
<style lang="scss" scoped>
.error-box {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.error-404-illustration {
    border-radius: 50%;
    overflow: hidden;
}

.btn-primary {
    background-color: #0099FF;
    color: white;
    border-radius: 5px;
    padding: 10px 20px;
    text-decoration: none;
}

.btn-primary:hover {
    background-color: #0077CC;
}
</style>
  