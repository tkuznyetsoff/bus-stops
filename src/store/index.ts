import { createStore } from 'vuex'
import axios from 'axios';
import type { Stop, SortOrder } from '../types/index'

export default createStore({
	state: {
		stops: [] as Stop[]
	},
	getters: {
		lines: (state) => [...new Set(state.stops.map((stop) => stop.line))].sort(),

		lineStops: (state) => (line: number, sortOrder: SortOrder) => state.stops.reduce((memo, stop) => {
			// const result = `${stop.stop} ${stop.order.toString().padStart(2, '0')}`
			if (stop.line === line && !memo.includes(stop.stop)) memo.push(stop.stop)
			return memo
		}, [] as string[])?.sort((a, b) => sortOrder === 'asc' ? a.localeCompare(b) : b.localeCompare(a)),

		stopTimes: (state) => (stop: string) => state.stops.reduce((memo, stopObj) => {
			if (stop === stopObj.stop && !memo.includes(stopObj.time)) memo.push(stopObj.time)
			return memo
		}, [] as string[])?.sort((a, b) => {
			const [hoursA, minutesA] = a.split(':').map(Number)
			const [hoursB, minutesB] = b.split(':').map(Number)
			return hoursA - hoursB || minutesA - minutesB
		})
	},
	mutations: {
		setStops (state, stops) {
			state.stops = stops;
		}
	},
	actions: {
		async fetchStops ({ commit }) {
			const { data: stops } = await axios.get<Stop[]>('http://localhost:3000/stops');
			commit('setStops', stops)
		}
	},
	modules: {
	}
})
