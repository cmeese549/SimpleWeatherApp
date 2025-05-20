<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import { 
    getCityLocation,
     type CityLocation, 
     getWeatherData, 
     type WeatherData 
} from '../../data'

import RightNow from './RightNow.vue';
import HourlyForecast from './HourlyForecast.vue';
import FiveDayForecast from './FiveDayForecast.vue';
import LoadingSpinner from '../LoadingSpinner.vue';
import type { PinnedCity } from '../PinnedCities.vue';

let cityLocation: CityLocation | { error: string } | null = null
const weatherData = ref<WeatherData | null>(null)
const isLoading = ref(false)

const emit = defineEmits(['togglePinned', 'lastUpdated'])

const props = defineProps<{
    activeCityName: string
    pinnedCities: Array<PinnedCity>
    metric: string
}>()

const isCityPinned = computed(() => {
    return props.pinnedCities.some(city => city.name === props.activeCityName)
})

const refreshWeather = async () => {
    if (!cityLocation || 'error' in cityLocation) return
    
    isLoading.value = true
    const apiData = await getWeatherData(cityLocation, props.metric)
    if ('error' in apiData) {
        console.error(apiData.error)
        isLoading.value = false
        return
    }
    weatherData.value = apiData
    isLoading.value = false
    emit('lastUpdated', new Date().toLocaleString().split(', ')[1])
}

watch(() => props.activeCityName, async (newCityName) => {
    isLoading.value = true
    
    const location = await getCityLocation(newCityName)
    if ('error' in location) {
        console.error(location.error)
        isLoading.value = false
        return
    }
    cityLocation = location
    const apiData = await getWeatherData(location, props.metric)
    if ('error' in apiData) {
        console.error(apiData.error)
        isLoading.value = false
        return
    }
    weatherData.value = apiData
    isLoading.value = false
    emit('lastUpdated', new Date().toLocaleString().split(', ')[1])
}, { immediate: true })

watch(() => props.metric, async (_newMetric) => {
    await refreshWeather()
})
</script>

<template>
    <div class="relative">
        <div v-if="weatherData !== null && !isLoading" class="flex flex-col">
            <RightNow 
                :weatherData="{ name: activeCityName, ...weatherData.current}" 
                :isPinned="isCityPinned"
                @togglePinned="emit('togglePinned', activeCityName)"
                @refresh="refreshWeather"
            />
            <HourlyForecast :weatherData="weatherData.forecast"/>
            <FiveDayForecast :weatherData="weatherData.forecast"/>
        </div>
        <div v-else class="flex justify-center items-center h-full p-7">
            <LoadingSpinner />
        </div>
    </div>
</template>