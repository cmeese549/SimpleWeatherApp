<script setup lang="ts">
import { searchCities } from '@/data'
import { ref } from 'vue'

const searchQuery = ref('')
const searchResults = ref<string[]>([])

const updateSearchQuery = async () => {
    searchResults.value = await searchCities(searchQuery.value)
}

const emit = defineEmits(['citySelected'])
</script>

<template>
    <div class="m-1 border-gray-200 rounded-lg bg-white flex flex-col text-black">
        <input class="p-2" type="text" placeholder="Search for a city" v-model="searchQuery"
            @input="updateSearchQuery" />
        <div class="font-bold">
            <div class="flex flex-col">
                <button v-for="result in searchResults" :key="result"
                    class="inline-block border-b border-gray-400 last:border-b-0 text-center text-xl h-10"
                    @click="emit('citySelected', result.split(',')[0])">
                    <p>{{ result }}</p>
                </button>
            </div>
        </div>
    </div>
</template>