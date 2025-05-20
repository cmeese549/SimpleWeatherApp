<script setup lang="ts">
interface RightNowProps {
    name: string
    temp: number
    feelsLike: number
    tempMax: number
    tempMin: number
    description: string
}

const emit = defineEmits(['togglePinned', 'refresh'])

defineProps<{
    weatherData: RightNowProps
    isPinned: boolean
}>()

</script>

<template>
    <div class="p-3 text-white flex flex-col items-center">
        <div class="flex w-full justify-between">
            <button class="w-15" @click="emit('togglePinned')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" :fill="isPinned ? 'white' : 'none'" viewBox="0 0 24 24" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
            </button>
            <h1 class="text-2xl font-bold flex-grow text-center">{{ weatherData.name }}</h1>
            <button class="w-15 flex justify-end" @click="emit('refresh')">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
        <p class="text-8xl">{{ weatherData.temp }}°</p>
        <p class="">Feels Like: {{ weatherData.feelsLike }}°</p>
        <p>H: {{ weatherData.tempMax }}° L: {{ weatherData.tempMin }}°</p>
        <p>{{ weatherData.description}}</p>
    </div>
</template>