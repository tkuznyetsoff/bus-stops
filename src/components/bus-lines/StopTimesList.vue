<template>
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
</template>

<script setup lang="ts">
import { useBusStops } from '@/composables/useBusStops';

const { selectedStop, timesByStop, formatStopOrder } = useBusStops()
</script>
