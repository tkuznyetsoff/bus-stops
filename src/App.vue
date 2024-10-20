<template>
    <div class="container py-5 mx-auto d-flex flex-column h-full">
        <h1 class="font-header/semibold mb-4">Timetable</h1>
        <TheNavbar class="mb-3"/>
        <RouterView/>
    </div>
</template>

<script lang="ts" setup>
import TheNavbar from '@/components/TheNavbar.vue';
import { useBusStops } from '@/composables/useBusStops';
import { onMounted } from 'vue'

const { getStops } = useBusStops()

onMounted(getStops)
</script>
