<template>
	<div class="d-flex flex-column gap-3 overflow-hidden flex-grow-1">
		<AppCard class="overflow-hidden">
			<div class="m-2 col-3 position-relative">
				<input
					v-model="query"
					class="form-control py-2 px-3 pe-5"
					placeholder="Search..."
				>
				<SearchIcon class="input__icon"/>
			</div>
			<p class="font-label/semibold p-4 mb-0 border-bottom cursor-pointer" @click="toggleSort">
				Bus Stops
				<SortIcon/>
			</p>
			<div v-if="isLoading" class="spinner-border text-primary m-4"></div>
			<ul
				v-else-if="stops.length"
				class="list-group list-group-flush overflow-auto flex-1"
			>
				<button
					v-for="(lineStop, index) in stops"
					:key="index"
					:class="[
						'list-group-item list-group-item-action font-body/regular'
					]"
				>
					{{ lineStop.stop }} {{ formatStopOrder(lineStop.order) }}
				</button>
			</ul>
			<p v-else class="p-4 m-0 text-secondary">No {{ query ? 'search' : '' }} results</p>
		</AppCard>
	</div>
</template>

<script setup lang="ts">
import SortIcon from '@/components/icons/SortIcon.vue';
import AppCard from '@/components/AppCard.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import { useBusStops } from '@/composables/useBusStops';
import { ref, computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore()
const { isLoading, sortOrder, formatStopOrder, toggleSort } = useBusStops()

const query = ref('')
const stops = computed(() => store.getters.filteredStops(query.value, sortOrder.value))
</script>

<style lang="scss">
.input__icon {
	color: #ced4da;
	transition: color .15s ease-in-out;
}
.form-control {
	font-size: 12px;

	& + .input__icon {
		position: absolute;
		top: 10px;
		right: 16px;
	}

	&::placeholder {
		font-size: 12px;
		font-weight: 400;
		line-height: 16px;
		color: rgba(154, 157, 164, 1);
	}

	&:focus {
		border-color: #1952E1;
		box-shadow: none;

		& + .input__icon {
			color: #1952E1
		}
	}
}

</style>