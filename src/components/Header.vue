<script setup lang="ts">
const emit = defineEmits(['toggleSearch'])

defineProps<{
    activeCityName: string
    searching: boolean
}>()
</script>

<template>
    <div class="p-3 text-white text-xl font-bold flex">
        <h1 class="flex-grow">Simple Weather App</h1>
        <button v-if="!searching" @click="emit('toggleSearch')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </button>
        <button v-else @click="emit('toggleSearch')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>
</template>