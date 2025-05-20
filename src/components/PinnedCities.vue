<script setup lang="ts">

export interface PinnedCity {
    id: number
    name: string
} 

const emit = defineEmits(['citySelected'])

defineProps<{
    cities: Array<PinnedCity>
    activeCityId: number
}>()
</script>

<template>
    <div class="font-bold bg-white overflow-x-auto scrollbar-hide sticky top-13 z-10">
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