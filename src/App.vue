<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PinnedCities from './components/PinnedCities.vue'
import Weather from './components/Weather/Weather.vue'
import Search from './components/Search.vue'

import type { PinnedCity } from './types'

const activeCityId = ref(0)
const activeCityName = ref('Empty')
let cityId = 0
const pinnedCities = ref<PinnedCity[]>([
  {
    id: cityId++,
    name: 'Denver'
  },
  {
    id: cityId++,
    name: 'Rio De Janeiro'
  },
  {
    id: cityId++,
    name: 'Beijing'
  },
  {
    id: cityId++,
    name: 'Los Angeles'
  }
])

const searching = ref(false)

const togglePinned = (cityName: string) => {
  const currentCities = [...pinnedCities.value]
  const cityIndex = currentCities.findIndex(city => city.name === cityName)
  if (cityIndex !== -1) {
    currentCities.splice(cityIndex, 1)
    cityId = 0
    pinnedCities.value = currentCities.map(city => ({
      ...city,
      id: cityId++
    }))
  } else {
    currentCities.push({
      id: cityId++,
      name: cityName
    })
    pinnedCities.value = currentCities
    activeCityId.value = cityId
    activeCityName.value = cityName
  }
}

const updateActiveCity = (cityId: number) => {
  activeCityId.value = cityId
  activeCityName.value = pinnedCities.value[cityId].name
}

const toggleSearch = () => {
  searching.value = !searching.value
}

onMounted(() => updateActiveCity(0))
</script>

<template>
  <div class="bg-gradient-to-b from-sky-600 from-10% via-sky-500 via-30% to-amber-200 min-h-screen flex flex-col">
    <Header 
      :activeCityName="activeCityName" 
      :searching="searching" 
      @toggleSearch="toggleSearch"
    />
    <div v-if="!searching" class="flex-grow">
      <PinnedCities 
        :cities="pinnedCities" 
        :activeCityId="activeCityId" 
        @citySelected="updateActiveCity" 
      />
      <Weather :activeCityName="activeCityName" :pinnedCities="pinnedCities" @togglePinned="togglePinned" />
    </div>
    <div v-else class="flex-grow">
      <Search @citySelected="(cityName) => { activeCityName = cityName; searching = false }" />
    </div>
    <Footer lastUpdated="2025-05-20" />
  </div>
</template>