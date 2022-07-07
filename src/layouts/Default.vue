<template>
	<v-app>
		<v-row style="max-height:50px;">
			<v-col style="height:50px;">
				<v-tabs
					fixed-tabs
				>
					<v-tab>
						어뷰징 검색
					</v-tab>
				</v-tabs>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<slot />
			</v-col>
		</v-row>
	</v-app>
</template>
<script>
export default {
	data() {
		return {
			drawer: true,
			items: [
				{ title: 'Home', icon: 'mdi-home-city', viewName: 'home' }
			],
			mini: false
		}
	},
	methods: {
		goto(url)
		{
			this.$router.push({name: url});
		}
	}
}
</script>
