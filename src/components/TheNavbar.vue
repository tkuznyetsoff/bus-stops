<template>
	<nav class="nav bg-white ps-4 rounded-1">
		<router-link class="nav-link" :to="{ name: 'bus-lines' }">Bus Lines</router-link>
		<router-link class="nav-link" :to="{ name: 'bus-stops' }">Stops</router-link>
	</nav>
</template>

<style scoped>
.nav-link {
	padding: 20px 24px;
	color: #9A9DA4;

	&.router-link-active {
		color: black;
		border-bottom: 2px solid #1952E1;
	}
}
</style>