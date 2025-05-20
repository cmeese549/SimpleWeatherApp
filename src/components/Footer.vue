<script setup lang="ts">
const props = defineProps<{
    lastUpdated: string
}>()
</script>

<template>
    <div class="p-2 text-white text-sm text-right bg-sky-600">
        <p>Last Updated : {{ lastUpdated || 'Never'}}</p>
    </div>
</template>