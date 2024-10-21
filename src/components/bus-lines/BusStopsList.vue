<template>
	<h3 class="font-title/semibold p-4 pb-2 mb-0">Bus Line: {{ selectedLine }}</h3>
	<p class="font-label/semibold p-4 mb-0 border-bottom cursor-pointer" @click="toggleSort">
		Bus Stops
		<SortIcon/>
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
</template>

<script setup lang="ts">
import SortIcon from '@/components/icons/SortIcon.vue';
import { useBusLines } from '@/composables/useBusLines';
import { useBusStops } from '@/composables/useBusStops';

const { selectedStop, stopsByLine, formatStopOrder, toggleSort } = useBusStops()
const { selectedLine } = useBusLines()
</script>
