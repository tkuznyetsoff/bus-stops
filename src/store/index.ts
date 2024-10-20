import { createStore } from 'vuex'
import axios from 'axios';
import type { Stop, SortOrder } from '../types/index'

export default createStore({
	state: {
		stops: [] as Stop[]
	},
	getters: {
		lines: (state) => [...new Set(state.stops.map((stop) => stop.line))].sort((a, b) => a - b),

		stopsByLine: (state) => (line: number, sortOrder?: SortOrder): Stop[] => {
			return state.stops
				.filter((stop) => stop.line === line)
				.sort((a, b) => 
					sortOrder === 'asc'
						? a.stop.localeCompare(b.stop) || a.order - b.order
						: b.stop.localeCompare(a.stop) || b.order - a.order
				);
		},

		timesByStop: (state, getters) => (line: number, selectedStop: Stop | null): Stop[] => {
			return (getters.stopsByLine(line) as Stop[])
				.filter(({ stop, order }) => stop === selectedStop?.stop && order === selectedStop.order)
				.sort((a, b) => {
					const timeToMinutes = (time: string) => {
						const [hours, minutes] = time.split(':').map(Number);
						return hours * 60 + minutes;
					};
					return timeToMinutes(a.time) - timeToMinutes(b.time);
				})
		},

		filteredStops: (state) => (query: string): Stop[] => {
			return !query ? state.stops : state.stops.filter((stop) => stop.stop.includes(query))
		}
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
