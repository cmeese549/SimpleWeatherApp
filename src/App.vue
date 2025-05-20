<script setup lang="ts">
import { ref } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PinnedCities from './components/PinnedCities.vue'
import type { PinnedCity } from './types'

const activeCityId = ref(0)
let cityId = -1
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
  <div class="bg-sky-700 min-h-screen flex flex-col">
    <Header city="Rio De Janeiro" />
    <div class="flex-grow">
      <PinnedCities :cities="pinnedCities" :activeCityId="activeCityId" @citySelected="(cityId) => activeCityId = cityId" />
    </div>
    <Footer lastUpdated="2025-05-20" />
  </div>
</template>