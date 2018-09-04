<template>
	<div class="content">
		<div class="sidebar">
			<ul>
				<li :class="{current:index==k}" v-for="(v,k) in arr" @click="change(k)"><a href="##">
					{{v}}
				</a></li>
			</ul>
		</div>
		<div class="main">
			<ul>
				<li v-for="v in mom" v-show = "index==0">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<h3>{{v.detail}}</h3>
					</a>
				</li>
				<li v-for="v in dress" v-show = "index==1">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<h3>{{v.detail}}</h3>
					</a>
				</li>
				<li v-for="v in house" v-show = "index==2">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<h3>{{v.detail}}</h3>
					</a>
				</li>
				<li v-for="v in food" v-show = "index==3">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<h3>{{v.detail}}</h3>
					</a>
				</li>
				<li v-for="v in global" v-show = "index==4">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<h3>{{v.detail}}</h3>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				arr:["母婴专区","美妆护肤","家居生活","食品营养","全球直邮"],
				mom:[],
				dress:[],
				house:[],
				food:[],
				global:[],
				index:0,
				num:0
			}
		},
		methods:{
			change(k){
				this.index = k;
				this.http.get("http://localhost:8050/mom#/").then((res)=>{
					this.mom = res.data;
				})
				this.http.get("http://localhost:8050/dress#/").then((res)=>{
					this.dress = res.data;
				})
				this.http.get("http://localhost:8050/house#/").then((res)=>{
					this.house = res.data;
				})
				this.http.get("http://localhost:8050/food#/").then((res)=>{
					this.food = res.data;
				})
				this.http.get("http://localhost:8050/global#/").then((res)=>{
					this.global = res.data;
				})
			}
		},
		mounted(){
			this.http.get("http://localhost:8050/mom#/").then((res)=>{
					this.mom = res.data;
			})
			
		}
	}
</script>

<style lang = "scss">
	.content{
		margin-bottom: 1rem;
		background: #fafafa;
		overflow: hidden;
		.sidebar {
			float:left;
			li{
				width: 2.35rem;
				a{
					font-size: 0.28rem;
					color:#333;
					display: block;
					line-height: 0.95rem;
					text-align: center;
					
				}
				&.current{
					a{
						border-left: 10px solid #1d84a7;
						color:#ff9900;
						background: #fff;
					}
				}
			}
			
			
		}
		.main{
			width: 4.8rem;
			float:right;
			ul{
				display:flex;
				flex-wrap: wrap;
				justify-content: space-between;
				li{
					width: 2.25rem;
					border: 3px solid #1d84a7;
					margin:0.2rem 0 ;
					border-radius: 7px;
					text-align: center;
					img{
						width: 80%;
					}
				}
			}
			h3{
				font-size: 0.23rem;
				color:#fff;
				background: #1d84a7;
				line-height: 0.4rem;
			}
		}
	}
</style>