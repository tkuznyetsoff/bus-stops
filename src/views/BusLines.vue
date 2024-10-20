<template>
	<div class="d-flex flex-column gap-3 overflow-hidden flex-grow-1">
		<div class="d-flex flex-column gap-4 bg-white p-4 rounded-1">
			<h3 class="font-title/semibold">Select Bus Line</h3>
			<div v-if="isLoading" class="spinner-border text-primary"></div>
			<div v-else-if="lines.length" class="lines-grid gap-2">
				<button
					v-for="line in lines"
					:key="line"
					:class="[{ active: selectedLine === line }, 'btn btn-primary px-3 py-2 font-body/medium']"
					@click="selectLine(line)"
				>{{ line }}</button>
			</div>
			<span v-else>No lines to show</span>
		</div>
		<div class="d-flex gap-4 overflow-hidden flex-grow-1">
			<div class="d-flex flex-column bg-white rounded-1 flex-1">
				<h3 class="font-title/semibold p-4 pb-2 mb-0">Bus Line: {{ selectedLine }}</h3>
				<p class="font-label/semibold p-4 mb-0 border-bottom cursor-pointer" @click="toggleSort">
					Bus Stops
					<img :src="sortIconSvg" alt="sort icon"/>
				</p>
				<ul class="list-group list-group-flush overflow-auto flex-1">
					<button
						v-for="(lineStop, index) in stopsByLine"
						:key="index"
						:class="[
							{ 'text-primary': selectedStop === lineStop },
							'list-group-item list-group-item-action font-body/regular'
						]"
						@click="selectedStop = lineStop"
					>
						{{ lineStop.stop }} {{ formatStopOrder(lineStop.order) }}
					</button>
				</ul>
			</div>
			<div class="d-flex flex-column bg-white rounded-1 flex-1">
				<h3 class="font-title/semibold p-4 pb-2 mb-0">Bus Stop: {{ selectedStop?.stop }} {{ formatStopOrder(selectedStop?.order) }}</h3>
				<p class="font-label/semibold p-4 mb-0 border-bottom">Time</p>
				<ul class="list-group list-group-flush overflow-auto flex-1">
					<li
						v-for="(stop, index) in timesByStop"
						:key="index"
						class="list-group-item list-group-item-action font-body/regular"
					>
						{{ stop.time }}
					</li>
				</ul>
			</div>
		</div>
		
	</div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { ref, computed, onMounted, watch } from 'vue'
import sortIconSvg from '@/assets/icons/sort-icon.svg'
import type { SortOrder, Stop } from '@/types/index'

const store = useStore()
const { isLoading, selectedStop, stopsByLine, timesByStop, formatStopOrder, toggleSort, getStops } = useBusStops()
const { selectedLine, lines, selectLine } = useBusLines()

onMounted(getStops)
watch(selectedLine, () => {
	selectedStop.value = null
})

function useBusStops () {
	const isLoading = ref<boolean>(false)
	const selectedStop = ref<Stop | null>(null)
	const sortOrder = ref<SortOrder>('asc')

	const stopsByLine = computed(() => Array.from(new Map(
		(store.getters.stopsByLine(selectedLine.value, sortOrder.value) as Stop[])
			.map(item => [`${item.stop}_${item.order}`, item])
	).values()))

	const timesByStop = computed<Stop[]>(() => store.getters.timesByStop(selectedLine.value, selectedStop.value))

	const formatStopOrder = (stop?: Stop['order']) => stop?.toString()?.padStart(2, '0')
	const toggleSort = () => sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
	const getStops = async function () {
		isLoading.value = true
		try {
			await store.dispatch('fetchStops')
		} catch (error) {
			console.error('Error fetching stops:', error);
		} finally {
			isLoading.value = false
		}
	}

	return {
		isLoading,
		selectedStop,
		sortOrder,
		stopsByLine,
		timesByStop,
		formatStopOrder,
		toggleSort,
		getStops
	}
}

function useBusLines () {
	const selectedLine = ref<number>()

	const lines = computed<number[]>(() => store.getters.lines)

	const selectLine = (line: number) => { selectedLine.value = line }

	return {
		selectedLine,
		lines,
		selectLine
	}
}
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