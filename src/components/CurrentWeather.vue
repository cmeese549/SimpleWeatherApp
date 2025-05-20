<script setup lang="ts">
defineProps<{
    activeCityName: string
}>()
</script>

<template>
    <div class="p-3 text-white flex flex-col items-center">
        <h1 class="text-2xl font-bold">{{ activeCityName || 'Simple Weather App'}}</h1>
        <p class="text-8xl">10°</p>
        <p class="">Feels Like: 12°</p>
        <p>H: 12° L: 12°</p>
        <p>Clear Sky</p>
    </div>
</template>