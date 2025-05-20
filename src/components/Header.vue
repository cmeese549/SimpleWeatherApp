<script setup lang="ts">
defineProps<{
    activeCityName: string
}>()
</script>

<template>
    <div class="p-3 text-white text-xl font-bold">
        <!-- <h1>{{ activeCityName || 'Simple Weather App'}}</h1> -->
        <h1>Simple Weather App</h1>
    </div>
</template>