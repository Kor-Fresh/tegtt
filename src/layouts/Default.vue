<template>
	<v-app>
		<v-overlay className="common" v-bind:value="$store.state.common.need_fetch">
			<v-progress-circular indeterminate/>
		</v-overlay>
		<v-row>
			<v-col>
				<v-card class="fill-height">
					<v-navigation-drawer
						v-model="drawer"
						v-bind:mini-variant.sync="mini"
						permanent
					>
						<v-list-item class="px-2">
							<v-list-item-avatar>
								<v-img src="/Fresh.png"></v-img>
							</v-list-item-avatar>
							
							<v-list-item-title>Fresh (tegtt)</v-list-item-title>
							
							
						</v-list-item>
						
						<v-divider></v-divider>
						
						<v-list dense>
							<v-list-item
								v-for="item in items"
								v-bind:key="item.title"
								link
								v-on:click="goto(item.viewName)"
							>
								<v-list-item-icon>
									<v-icon>{{ item.icon }}</v-icon>
								</v-list-item-icon>
								
								<v-list-item-content>
									<v-list-item-title>{{ item.title }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list>
					</v-navigation-drawer>
				</v-card>
			</v-col>
			<v-col cols="10">
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
				{ title: 'Home', icon: 'mdi-home-city', viewName: 'home' },
				{ title: 'Daughter', icon: 'mdi-account', viewName: 'daughter' },
				{ title: 'Joys', icon: 'mdi-account-group-outline', viewName: 'joy' },
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
