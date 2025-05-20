<script setup lang="ts">
import { ref, watch } from 'vue';

import { 
    getCityLocation,
     type CityLocation, 
     getWeatherData, 
     type WeatherData 
} from '../data'
import RightNow from './RightNow.vue';

let cityLocation: CityLocation | { error: string } | null = null

const weatherData = ref<WeatherData | null>(null)

const props = defineProps<{
    activeCityName: string
}>()

watch(() => props.activeCityName, async (newCityName) => {
    const location = await getCityLocation(newCityName)
    if ('error' in location) {
        console.error(location.error)
        return
    }
    cityLocation = location
    const apiData = await getWeatherData(location, 'metric')
    if ('error' in apiData) {
        console.error(apiData.error)
        return
    }
    weatherData.value = apiData
}, { immediate: true })
</script>

<template>
    <div v-if="weatherData !== null" class="flex flex-col">
        <RightNow :weatherData="{ name: activeCityName, ...weatherData}"/>
    </div>
    <div v-else class="flex justify-center items-center h-full p-7">
        <div role="status">
            <svg class="w-16 h-16 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        <span class="sr-only">Loading...</span>
     </div>
</div>
</template>