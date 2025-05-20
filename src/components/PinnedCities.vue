<script setup lang="ts">
import type { PinnedCity } from '../types'

const emit = defineEmits(['citySelected'])

const props = defineProps<{
    cities: Array<PinnedCity>
    activeCityId: number
}>()
</script>

<template>
    <div class="p-1 font-bold bg-white overflow-x-auto scrollbar-hide">
        <div class="flex whitespace-nowrap">
            <div v-for="city in cities" :key="city.id" 
                class="inline-block" 
                :class="{ 'bg-blue-100': city.id === activeCityId }"
                @click="emit('citySelected', city.id)"
            >
                <div class="p-2 text-center">
                    <p>{{ city.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>