<script setup lang="ts">
import type { PinnedCity } from '../types'

const emit = defineEmits(['citySelected'])

defineProps<{
    cities: Array<PinnedCity>
    activeCityId: number
}>()
</script>

<template>
    <div class="font-bold bg-white overflow-x-auto scrollbar-hide">
        <div class="flex gap-2 whitespace-nowrap text-gray-500">
            <div v-for="city in cities" :key="city.id" 
                class="inline-block cursor-pointer" 
                :class="{ 'text-black border-b-3 border-orange-700': city.id === activeCityId }"
                @click.prevent="emit('citySelected', city.id)"
            >
                <div class="p-3 text-center text-lg">
                    <p>{{ city.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>