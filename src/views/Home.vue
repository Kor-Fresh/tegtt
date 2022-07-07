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
			<v-col
				v-bind:md="options.cols.md"
				v-bind:sm="options.cols.sm"
				v-bind:xs="options.cols.xs"
				v-bind:lg="options.cols.lg"
				v-bind:xl="options.cols.xl"
			>
				<v-select
					v-bind:items="options.selector"
					item-value="value"
					item-text="name"
					label="서버"
					v-model="form.step1.server"
				></v-select>
			</v-col>
			<v-col
				v-bind:md="options.cols.md"
				v-bind:sm="options.cols.sm"
				v-bind:xs="options.cols.xs"
				v-bind:lg="options.cols.lg"
				v-bind:xl="options.cols.xl"
			>
				<v-select
					v-bind:items="options.raceId"
					item-value="value"
					item-text="name"
					label="종족"
					v-model="form.step1.race"
				></v-select>
			</v-col>
			<v-col
				v-bind:md="options.cols.md"
				v-bind:sm="options.cols.sm"
				v-bind:xs="options.cols.xs"
				v-bind:lg="options.cols.lg"
				v-bind:xl="options.cols.xl"
			>
				<v-text-field
					label="어포"
					type="number"
					v-model="form.step1.point"
				></v-text-field>
			</v-col>
			<v-col
				v-bind:md="options.cols.md"
				v-bind:sm="options.cols.sm"
				v-bind:xs="options.cols.xs"
				v-bind:lg="options.cols.lg"
				v-bind:xl="options.cols.xl"
			>
				<v-text-field
					label="킬수"
					type="number"
					v-model="form.step1.kill"
				></v-text-field>
			</v-col>
			<v-col
				v-bind:md="options.cols.md"
				v-bind:sm="options.cols.sm"
				v-bind:xs="options.cols.xs"
				v-bind:lg="options.cols.lg"
				v-bind:xl="options.cols.xl"
			>
				<v-text-field
					label="키워드"
					type="text"
					min="2"
					v-model="form.step1.keyword"
				></v-text-field>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-btn v-on:click="HANDLE_SEARCH_STEP1">검색</v-btn>
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-alert
					border="top"
					colored-border
					type="info"
					elevation="2"
				>
					<h4>착용 아이템을 키워드로 검색하는 방식 입니다.</h4>
				</v-alert>
			</v-col>
		</v-row>
		<v-row v-if="options.step1 !== null">
			<v-col>
				{{ options.step1.total }}건이 검색 되었습니다.
			</v-col>
		</v-row>
		<v-row>
			<v-col>
				<v-simple-table>
					<template v-slot:default>
						<thead>
						<tr>
							<th class="text-left">
								No.
							</th>
							<th class="text-left">
								고유ID
							</th>
							<th class="text-left">
								닉네임
							</th>
							<th class="text-left">
								직업
							</th>
							<th class="text-left">
								레기온
							</th>
						</tr>
						</thead>
						<tbody>
						<tr
							v-for="(item, key) in options.step2"
							v-bind:key="item.name"
							v-on:click="HANDLE_MOVE_CHARACTER(item)"
						>
							<td style="width: 20px">{{ key + 1 }}</td>
							<td>{{ item[0] }}</td>
							<td>{{ item[1] }}</td>
							<td>{{ item[2] }}</td>
							<td>{{ item[3] }}</td>
						</tr>
						</tbody>
					</template>
				</v-simple-table>
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
						keyword: "루드라",
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
					step2: [],
					count: 0,
					cols: {
						xs: "6",
						sm: "6",
						md: "4",
						lg: "3",
						xl: "3"
					}
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
				this.options.step1 = null;
				this.options.step2 = [];
				
				const data = {
					keyword: this.form.step1.keyword,
					server: this.form.step1.server,
					race: this.form.step1.race,
					point: this.form.step1.point,
					kill: this.form.step1.kill
				}
				
				this.$store.dispatch('common/call_list', data).then((result) => {
					if(result.status === 200)
					{
						this.options.step1 = {
							total: result.data.totalCount,
							loop:  Math.ceil(result.data.totalCount / 50)
						}
						
						for(let page = 1; page <= this.options.step1.loop; page++)
						{
							this.HANDLE_SEARCH_STEP2(page);
						}
					}
				});
			},
			HANDLE_SEARCH_STEP2(page)
			{
				this.options.dimmer = true;
				const data = {
					keyword: this.form.step1.keyword,
					server: this.form.step1.server,
					race: this.form.step1.race,
					point: this.form.step1.point,
					kill: this.form.step1.kill,
					loop: Math.ceil(this.options.step1.loop),
					page: page
				}
				
				this.$store.dispatch('common/call_list2', data).then((result) => {
					this.options.count++;
					
					if(result.status === 200)
					{
						if(result.data.length > 0)
						{
							result.data.forEach( (val) => {
								if(this.options.step2.filter( v => v[0] == val[0]).length < 1)
								{
									this.options.step2.push(val)
								}
							})
						}
					}
					
					if(this.options.count >= this.options.step1.loop)
					{
						this.options.dimmer = false;
					}
				});
			},
			HANDLE_MOVE_CHARACTER(char)
			{
				const url = this.common.sprintf("https://aion.plaync.com/characters/server/%s/id/%s/home",
					[this.form.step1.server, char[0]])
				window.open(url)
			}
		}
	}
</script>
