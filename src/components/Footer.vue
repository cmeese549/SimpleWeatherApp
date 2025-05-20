<script setup lang="ts">
const emit = defineEmits(['unitChange'])

defineProps<{
    lastUpdated: string
    measurementUnits: string
}>()
</script>

<template>
    <div class="p-2 text-white text-sm text-right bg-sky-600 sticky bottom-0 z-10 flex">
        <div class="flex gap-1 flex-grow">
            <p @click="emit('unitChange', 'metric')"
                :class="{ 'text-l font-bold cursor-pointer': measurementUnits === 'metric' }">Metric</p>
            <p> | </p>
            <p @click="emit('unitChange', 'imperial')"
                :class="{ 'text-l font-bold cursor-pointer': measurementUnits === 'imperial' }">Imperial</p>
        </div>
        <p class="flex justify-end">Last Updated : {{ lastUpdated || 'Never' }}</p>
    </div>
</template>