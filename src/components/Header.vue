<script setup lang="ts">
const props = defineProps<{
    city: string
}>()
</script>

<template>
    <div class="p-3 text-white text-xl font-bold">
        <h1>{{ city || 'Simple Weather App'}}</h1>
    </div>
</template>