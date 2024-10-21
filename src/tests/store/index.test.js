import { expect, describe, it, vi } from 'vitest';
import store from 'src/store';
import axios from 'axios';

vi.mock('axios');

describe('Vuex Store - State', () => {
	it('has an initial empty stops array', () => {
		const state = store.state;
		expect(state.stops).toEqual([]);
	});
});

describe('Vuex Store - Mutations', () => {
	it('sets stops correctly', () => {
		const stops = [{ stop: 'A', line: 1, order: 1, time: '12:00' }];
		store.commit('setStops', stops);
		expect(store.state.stops).toEqual(stops);
	});
});

describe('Vuex Store - Getters', () => {
	it('returns correct lines from stops', () => {
		store.state.stops = [
			{ stop: 'A', line: 1, order: 1, time: '12:00' },
			{ stop: 'B', line: 2, order: 2, time: '12:30' }
		];
		const lines = store.getters.lines;
		expect(lines).toEqual([1, 2]);
	});

	it('returns stops by line in ascending order', () => {
		store.state.stops = [
			{ stop: 'B', line: 1, order: 2, time: '12:30' },
			{ stop: 'A', line: 1, order: 1, time: '12:00' }
		];
		const stops = store.getters.stopsByLine(1, 'asc');
		expect(stops).toEqual([
			{ stop: 'A', line: 1, order: 1, time: '12:00' },
			{ stop: 'B', line: 1, order: 2, time: '12:30' }
		]);
	});

	it('filters stops based on query', () => {
		store.state.stops = [
			{ stop: 'Station A', line: 1, order: 1, time: '12:00' },
			{ stop: 'Station B', line: 2, order: 2, time: '12:30' }
		];
		const filteredStops = store.getters.filteredStops('B');
		expect(filteredStops).toEqual([
			{ stop: 'Station B', line: 2, order: 2, time: '12:30' }
		]);
	});
});

describe('Vuex Store - Actions', () => {
	it('fetches stops and commits them to the store', async () => {
		const stops = [{ stop: 'A', line: 1, order: 1, time: '12:00' }];
		axios.get.mockResolvedValue({ data: stops });

		await store.dispatch('fetchStops');
		expect(store.state.stops).toEqual(stops);
	});
});