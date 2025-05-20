<script setup lang="ts">
import { computed } from 'vue'
import type { HourlyForecastData } from '../../data'

const props = defineProps<{
    weatherData: HourlyForecastData[]
}>()

interface DailyForecast {
    date: Date
    tempHigh: number
    tempLow: number
    humidity: number
    icon: string
    description: string
}

const dailyForecast = computed(() => {
    const dailyData = new Map<string, {
        temps: number[],
        humidities: number[],
        icons: string[],
        descriptions: string[]
    }>()

    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    yesterday.setHours(0, 0, 0, 0)

    props.weatherData.forEach(forecast => {
        const date = new Date((forecast.time + forecast.timezone) * 1000)
        const dayKey = date.toISOString().split('T')[0]
        
        if (date < yesterday) return
        
        if (!dailyData.has(dayKey)) {
            dailyData.set(dayKey, {
                temps: [],
                humidities: [],
                icons: [],
                descriptions: []
            })
        }
        
        const day = dailyData.get(dayKey)!
        day.temps.push(forecast.temp)
        day.humidities.push(forecast.humidity)
        day.icons.push(forecast.icon)
        day.descriptions.push(forecast.description)
    })

    return Array.from(dailyData.entries())
        .map(([dayKey, data]) => {
            const date = new Date(dayKey)
            const tempHigh = Math.max(...data.temps)
            const tempLow = Math.min(...data.temps)
            const avgHumidity = Math.round(data.humidities.reduce((a, b) => a + b, 0) / data.humidities.length)
            
            const iconCounts = new Map<string, number>()
            const dayIcons = data.icons.filter(icon => icon.endsWith('d'))
            
            dayIcons.forEach(icon => {
                iconCounts.set(icon, (iconCounts.get(icon) || 0) + 1)
            })
            
            let maxCount = 0
            let mostCommonIcon = dayIcons[0] || data.icons[0]
            
            iconCounts.forEach((count, icon) => {
                if (count > maxCount) {
                    maxCount = count
                    mostCommonIcon = icon
                }
            })

            return {
                date,
                tempHigh,
                tempLow,
                humidity: avgHumidity,
                icon: mostCommonIcon,
                description: data.descriptions[0]
            }
        })
        .slice(0, 5)
})

const formatDate = (date: Date): string => {
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    return localDate.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    })
}
</script>

<template>
    <div class="m-2 block border border-gray-200 rounded-lg bg-sky-600 flex flex-col">
        <h5 class="p-2 text-2xl font-bold text-white">Next 5 Days</h5>
        <div class="font-bold">
            <div class="flex flex-col text-white justify-center">
                <div
                    v-for="(forecast, idx) in dailyForecast"
                    :key="forecast.date.toISOString()"
                    class="inline-block border-b border-gray-200 last:border-b-0"
                    :class="{
                        'pl-1': idx === 0,
                        'pr-1': idx === dailyForecast.length - 1
                    }"
                >
                    <div class="p-3 text-center text-lg flex items-center">
                        <img :src="`https://openweathermap.org/img/wn/${forecast.icon}.png`" :alt="forecast.description" class="w-15 h-15">
                        <div class="flex flex-col flex-grow">
                            <p>{{ formatDate(forecast.date) }}</p>
                            <p class="text-sm text-sky-300">{{ forecast.description }}</p>
                        </div>
                        <div class="flex flex-col">
                            <p>{{ forecast.tempLow }}° / {{ forecast.tempHigh }}°</p>
                            <p class="text-sm text-sky-300">{{ forecast.humidity }}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>