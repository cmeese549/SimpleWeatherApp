<script setup lang="ts">
import { ref, watch } from 'vue';

import { 
    getCityLocation,
     type CityLocation, 
     getWeatherData, 
     type WeatherData 
} from '../data'

import RightNow from './RightNow.vue';
import HourlyForecast from './HourlyForecast.vue';
import LoadingSpinner from './LoadingSpinner.vue';

let cityLocation: CityLocation | { error: string } | null = null
const weatherData = ref<WeatherData | null>(null)
const isLoading = ref(false)

const props = defineProps<{
    activeCityName: string
}>()

watch(() => props.activeCityName, async (newCityName) => {
    isLoading.value = true
    
    const location = await getCityLocation(newCityName)
    if ('error' in location) {
        console.error(location.error)
        isLoading.value = false
        return
    }
    cityLocation = location
    const apiData = await getWeatherData(location, 'metric')
    if ('error' in apiData) {
        console.error(apiData.error)
        isLoading.value = false
        return
    }
    weatherData.value = apiData
    console.log(apiData)
    isLoading.value = false
}, { immediate: true })
</script>

<template>
    <div>
        <div v-if="weatherData !== null && !isLoading" class="flex flex-col">
            <RightNow :weatherData="{ name: activeCityName, ...weatherData.current}"/>
            <HourlyForecast :weatherData="weatherData.forecast"/>
        </div>
        <div v-else class="flex justify-center items-center h-full p-7">
            <LoadingSpinner />
        </div>
    </div>
</template>