import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const selectedLine = ref<number>()

export function useBusLines () {
	const store = useStore()
	const lines = computed<number[]>(() => store.getters.lines)

	return {
		selectedLine,
		lines
	}
}