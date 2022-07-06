<template>
	<div class="ma-4 mr-10">
		<v-overlay v-bind:value="options.dimmer" class="text-center">
			<v-progress-circular
				indeterminate
				size="64"
			>
			</v-progress-circular>
			
			<h6 class="mt-4">시간이 오래 걸릴 수 있습니다. 아니 오래 걸려요 :)</h6>
		</v-overlay>
		<v-row>
			<v-col>
				<v-select
					v-bind:items="options.selector"
					item-value="value"
					item-text="name"
					label="서버"
					v-model="form.step1.server"
				></v-select>
			</v-col>
			<v-col>
				<v-select
					v-bind:items="options.raceId"
					item-value="value"
					item-text="name"
					label="종족"
					v-model="form.step1.race"
				></v-select>
			</v-col>
			<v-col>
				<v-text-field
					label="어포"
					type="number"
					v-model="form.step1.point"
				></v-text-field>
			</v-col>
			<v-col>
				<v-text-field
					label="킬수"
					type="number"
					v-model="form.step1.kill"
				></v-text-field>
			</v-col>
			<v-col>
				<v-text-field
					label="키워드"
					type="text"
					min="2"
					v-model="form.step1.keyword"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="2">
				<v-btn v-on:click="HANDLE_SEARCH_STEP1">검색</v-btn>
			</v-col>
		</v-row>
		<v-row v-if="options.step1 !== null">
			<v-col>
				{{ options.step1.total }}건이 검색 되었습니다.
			</v-col>
			<v-col>
				<v-btn v-on:click="HANDLE_SEARCH_STEP2">어뷰징 잡기</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				{{ options.step2 }}
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data()
		{
			return{
				form: {
					step1: {
						keyword: null,
						server: 21,
						race: 1,
						point: 1000000,
						kill: 1000
					}
				},
				options: {
					dimmer: false,
					selector: [
						{
							value: 21,
							name: '이스라펠'
						},
						{
							value: 22,
							name: '네자칸'
						},
						{
							value: 23,
							name: '지켈'
						},
						{
							value: 24,
							name: '바이젤'
						},
						{
							value: 25,
							name: '트리니엘'
						},
						{
							value: 26,
							name: '카이시넬'
						},
						{
							value: 27,
							name: '루미엘'
						},
						{
							value: 26,
							name: '유스티엘'
						},
						{
							value: 26,
							name: '마르쿠탄'
						}
					],
					raceId: [
						{
							value: 0,
							name: "천족"
						},
						{
							value: 1,
							name: "마족"
						}
					],
					step1: null,
					step2: null
				}
			}
		},
		mounted()
		{
		
		},
		methods:
		{
			HANDLE_SEARCH_STEP1()
			{
				this.$store.dispatch('common/call_list', this.form.step1).then((result) => {
					if(result.status === 200)
					{
						console.log(result)
						this.options.step1 = {
							total: result.data.totalCount,
							loop:  result.data.totalCount / 150
						}
					}
				});
			},
			HANDLE_SEARCH_STEP2()
			{
				this.options.dimmer = true;
				this.$store.dispatch('common/call_list2', Object.assign({}, this.form.step1, { loop: Math.ceil(this.options.step1.loop) })).then((result) => {
					console.log(result)
					this.options.dimmer = false;
					if(result.status === 200)
					{
						this.options.step2 = result.data;
					}
				});
			}
		}
	}
</script>
