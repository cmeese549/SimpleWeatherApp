<script setup lang="ts">
interface RightNowProps {
    name: string
    temp: number
    feelsLike: number
    tempMax: number
    tempMin: number
    description: string
}

defineProps<{
    weatherData: RightNowProps
}>()

</script>

<template>
    <div class="p-3 text-white flex flex-col items-center">
        <h1 class="text-2xl font-bold">{{ weatherData.name }}</h1>
        <p class="text-8xl">{{ weatherData.temp }}°</p>
        <p class="">Feels Like: {{ weatherData.feelsLike }}°</p>
        <p>H: {{ weatherData.tempMax }}° L: {{ weatherData.tempMin }}°</p>
        <p>{{ weatherData.description}}</p>
    </div>
</template>