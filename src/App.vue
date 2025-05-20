<script setup lang="ts">
import { ref } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PinnedCities from './components/PinnedCities.vue'
import Weather from './components/Weather.vue'
import type { PinnedCity } from './types'

const activeCityId = ref(0)
let cityId = 0
const pinnedCities: Array<PinnedCity> = [
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
]
</script>

<template>
  <div class="bg-gradient-to-b from-sky-600 from-10% via-sky-500 via-30% to-amber-200 min-h-screen flex flex-col">
    <Header :activeCityName="pinnedCities[activeCityId].name" />
    <div class="flex-grow">
      <PinnedCities 
        :cities="pinnedCities" 
        :activeCityId="activeCityId" 
        @citySelected="(cityId) => activeCityId = cityId" 
      />
      <Weather :activeCityName="pinnedCities[activeCityId].name" />
    </div>
    <Footer lastUpdated="2025-05-20" />
  </div>
</template>