import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import type { SortOrder, Stop } from '@/types/index'
import { useBusLines } from '@/composables/useBusLines'

const { selectedLine } = useBusLines()

const isLoading = ref<boolean>(false)
const selectedStop = ref<Stop | null>(null)
const sortOrder = ref<SortOrder>('asc')

export function useBusStops () {
	const store = useStore()
	const stopsByLine = computed(() => Array.from(new Map(
		(store.getters.stopsByLine(selectedLine.value, sortOrder.value) as Stop[])
			.map(item => [`${item.stop}_${item.order}`, item])
	).values()))
	const timesByStop = computed<Stop[]>(() => store.getters.timesByStop(selectedLine.value, selectedStop.value))

	const formatStopOrder = (order?: Stop['order']) => order?.toString()?.padStart(2, '0')
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