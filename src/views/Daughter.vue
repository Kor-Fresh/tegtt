<template>
	<div class="my-5">
		<v-row>
			<v-col
				v-for="(item, key) in lists"
				v-bind:key="key"
			>
				<v-card
					class="mx-auto"
					max-width="344"
				>
					<v-card-title>
						{{ item.title }}
					</v-card-title>
					
					<v-card-actions>
						<v-btn
							color="blue lighten-2"
							text
							v-on:click="move(item)"
						>
							보기
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	export default {
		name: 'Home',
		data() {
			return {
				lists: [
					{title: "구몬 숫자송 1~10", link: "http://www.kumon.co.kr/Qr/Index?qrCode=MT_01"},
					{title: "구몬 숫자송 11~20", link: "http://www.kumon.co.kr/Qr/Index?qrCode=MT_02"},
					{title: "구몬 숫자송 21~30", link: "http://www.kumon.co.kr/Qr/Index?qrCode=MT_03"},
				]
			}
		},
		methods: {
			move(item)
			{
				location.href = item.link
			}
		}
	}
</script>
