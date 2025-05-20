<script setup lang="ts">
import { computed } from 'vue'
import type { HourlyForecastData } from '../../data'

const props = defineProps<{
    weatherData: HourlyForecastData[]
}>()

const nextDayForecast = computed(() => {
    return props.weatherData.slice(0, 9)
})

function formatTime(timestamp: number, timezone: number): string {
    const date = new Date((timestamp + timezone) * 1000)
    const localHour = date.getUTCHours()
    const ampm = localHour >= 12 ? 'pm' : 'am'
    const hour12 = localHour % 12 || 12
    return `${hour12}${ampm}`
}
</script>

<template>
    <div class="m-2 block border border-gray-200 rounded-lg bg-sky-600 flex flex-col">
        <h5 class="p-2 text-2xl font-bold text-white">Next 24 Hours</h5>
        <div class="font-bold overflow-x-auto scrollbar-hide">
            <div class="flex min-w-max whitespace-nowrap text-white justify-center">
                <div
                    v-for="(forecast, idx) in nextDayForecast"
                    :key="forecast.time"
                    class="inline-block flex-grow"
                    :class="{
                        'pl-1': idx === 0,
                        'pr-1': idx === nextDayForecast.length - 1
                    }"
                >
                    <div class="p-3 text-center text-lg flex flex-col items-center">
                        <p>{{ forecast.temp }}°</p>
                        <p class="text-sm text-sky-300">{{ forecast.humidity }}%</p>
                        <img :src="`https://openweathermap.org/img/wn/${forecast.icon}.png`" :alt="forecast.description" class="w-10 h-10">
                        <p>{{ formatTime(forecast.time, forecast.timezone) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>