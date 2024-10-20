<template>
	<div :class="[
		{ 'app-card--bordered': placeholder },
		'app-card d-flex flex-column bg-white rounded-1'
	]">
		<div v-if="placeholder" class="d-flex align-items-center justify-content-center w-full h-full">
			<p class="text-secondary">{{ placeholder }}</p>
		</div>
		<slot v-else></slot>
	</div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
	placeholder?: string
}>()
</script>

<style>
.app-card--bordered {
	border: dashed 2px;
	border-image-slice: 1;
	border-image-repeat: round;
	border-image-source: url('@/assets/border.png');
}
</style>