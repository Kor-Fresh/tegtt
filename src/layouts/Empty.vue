<template>
	<v-app>
		<v-main>
			<slot />
		</v-main>

		<v-overlay class="common" v-bind:value="$store.state.common.need_fetch">
			<v-progress-circular indeterminate />
		</v-overlay>
	</v-app>
</template>