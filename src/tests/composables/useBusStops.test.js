import { describe, it, expect, vi } from 'vitest';
import { useBusStops } from '@/composables/useBusStops.ts';

vi.mock('vuex', () => ({
	useStore: () => ({
		getters: {
			stopsByLine: vi.fn().mockReturnValue([]),
			timesByStop: vi.fn().mockReturnValue([])
		},
		dispatch: vi.fn()
	}),
}));

describe('useBusStops composable', () => {
	it('initializes with the correct default values', () => {
		const { isLoading, selectedStop, sortOrder } = useBusStops();
		
		expect(isLoading.value).toBe(false);
		expect(selectedStop.value).toBe(null);
		expect(sortOrder.value).toBe('asc');
	});

	it('toggles sortOrder correctly', () => {
		const { sortOrder, toggleSort } = useBusStops();
		
		expect(sortOrder.value).toBe('asc');
		toggleSort();
		expect(sortOrder.value).toBe('desc');
		toggleSort();
		expect(sortOrder.value).toBe('asc');
	});

	it('formats stop order correctly', () => {
		const { formatStopOrder } = useBusStops();
		
		expect(formatStopOrder(5)).toBe('05');
		expect(formatStopOrder(10)).toBe('10');
		expect(formatStopOrder()).toBe(undefined);
	});

	it('fetches stops and updates loading state correctly', async () => {
		const { getStops, isLoading } = useBusStops();

		expect(isLoading.value).toBe(false);

		const fetchPromise = getStops();
		expect(isLoading.value).toBe(true);

		await fetchPromise;
		expect(isLoading.value).toBe(false);
	});
});
