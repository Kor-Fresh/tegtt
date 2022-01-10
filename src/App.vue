<template>
	<div id="app">
		<component v-bind:is="layout" v-bind:class="route_class">
			<router-view />
		</component>
	</div>
</template>

<script>

export default
{
	computed: {
		layout()
		{
			return  'layout-' + (this.$route.meta.layout || 'empty');
		},
		route_class()
		{
			return 'route--' + this.$route.name;
		}
	}
};
</script>
