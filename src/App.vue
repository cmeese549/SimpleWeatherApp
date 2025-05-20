<script setup lang="ts">
import { ref, onMounted } from 'vue'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import PinnedCities, { type PinnedCity } from './components/PinnedCities.vue'
import Weather from './components/Weather/Weather.vue'
import Search from './components/Search.vue'
import { loadLocalData, saveLocalData, type LocalData } from './data'

const activeCityId = ref(0)
const activeCityName = ref('Empty')
let cityId = 0
const pinnedCities = ref<PinnedCity[]>([])

const searching = ref(false)
const lastUpdated = ref('Never')
const measurementUnits = ref('metric')

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
  saveLocalData({
    pinnedCities: pinnedCities.value.map(city => city.name),
    metric: measurementUnits.value
  })
  const newCityIndex = pinnedCities.value.findIndex(city => city.name === cityName)
  updateActiveCity(pinnedCities.value[newCityIndex].id)
}

const updateActiveCity = (cityId: number) => {
  activeCityId.value = cityId
  activeCityName.value = pinnedCities.value[cityId].name
}

const toggleSearch = () => {
  searching.value = !searching.value
}

const updateMeasurementUnits = (units: string) => {
  measurementUnits.value = units
  saveLocalData({
    pinnedCities: pinnedCities.value.map(city => city.name),
    metric: units
  })
}

onMounted(async () => {
  const localData = await loadLocalData()
  pinnedCities.value = localData.pinnedCities.map(city => ({
    id: cityId++,
    name: city
  }))
  measurementUnits.value = localData.metric
  updateActiveCity(0)
})
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
      <Weather v-if="pinnedCities.length > 0 || activeCityName !== 'Empty'"
        :activeCityName="activeCityName" 
        :pinnedCities="pinnedCities"
        :metric="measurementUnits"
        @togglePinned="togglePinned" 
        @lastUpdated="time => lastUpdated = time"
       />
      <div v-else class="flex-grow flex justify-center items-center">
        <h1 class="text-white text-2xl font-bold mt-20">Please search for a city.</h1>
      </div>
    </div>
    <div v-else class="flex-grow">
      <Search @citySelected="(cityName) => { activeCityName = cityName; searching = false }" />
    </div>
    <Footer 
      :lastUpdated="lastUpdated" 
      :measurementUnits="measurementUnits"
      @unitChange="updateMeasurementUnits" 
     />
  </div>
</template>