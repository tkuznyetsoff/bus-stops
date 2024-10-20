<template>
	<div class="d-flex flex-column gap-3 overflow-hidden flex-grow-1">
		<AppCard class="gap-4 p-4">
			<h3 class="font-title/semibold">Select Bus Line</h3>
			<div v-if="isLoading" class="spinner-border text-primary"></div>
			<div v-else-if="lines?.length" class="lines-grid gap-2">
				<button
					v-for="line in lines"
					:key="line"
					:class="[{ active: selectedLine === line }, 'btn btn-primary px-3 py-2 font-body/medium']"
					@click="selectedLine = line"
				>{{ line }}</button>
			</div>
			<span v-else>No lines to show</span>
		</AppCard>
		<div class="d-flex gap-4 overflow-hidden flex-grow-1">
			<AppCard :placeholder="busStopsPlaceholder" class="flex-1">
				<BusStopsList/>
			</AppCard>
			<AppCard :placeholder="stopTimesPlaceholder" class="flex-1">
				<StopTimesList/>
			</AppCard>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useBusStops } from '@/composables/useBusStops'
import { useBusLines } from '@/composables/useBusLines'

import AppCard from '@/components/AppCard.vue'
import BusStopsList from '@/components/bus-lines/BusStopsList.vue'
import StopTimesList from '@/components/bus-lines/StopTimesList.vue'

const { isLoading, selectedStop, getStops } = useBusStops()
const { selectedLine, lines } = useBusLines()

const busStopsPlaceholder = computed(() => !selectedLine.value ? 'Please select the bus line first' : '')
const stopTimesPlaceholder = computed(() => !selectedLine.value ? 'Please select the bus line first' : !selectedStop.value ? 'Please select the bus stop first' : '')

onMounted(getStops)
onUnmounted(() => {
	selectedLine.value = undefined
	selectedStop.value = null
})
watch(selectedLine, () => {
	selectedStop.value = null
})
</script>

<style>
.lines-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(54px, 1fr));
}

.list-group-item.list-group-item-action {
	padding: 20px 24px;
}
</style>