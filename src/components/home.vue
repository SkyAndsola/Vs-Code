<template>
	<div class="main">
		<product>
			<h2 slot = "tit">今日疯抢</h2>
			<ul slot = "pro">
				<li v-for="v in hot">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<div><span>{{v.price}}</span><span>{{v.old_price}}</span></div>
						<p>{{v.detail}}</p>
					</a>
				</li>
			</ul>
		</product>
		<product>
			<h2 slot = "tit">母婴专区</h2>
			<ul slot = "pro">
				<li v-for="v in mom">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<div><span>{{v.price}}</span><span>{{v.old_price}}</span></div>
						<p>{{v.detail}}</p>
					</a>
				</li>
			</ul>
		</product>
		<product>
			<h2 slot = "tit">美妆护肤</h2>
			<ul slot = "pro">
				<li v-for="v in dress">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<div><span>{{v.price}}</span><span>{{v.old_price}}</span></div>
						<p>{{v.detail}}</p>
					</a>
				</li>
			</ul>
		</product>
		<product>
			<h2 slot = "tit">家具生活</h2>
			<ul slot = "pro">
				<li v-for="v in house">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<div><span>{{v.price}}</span><span>{{v.old_price}}</span></div>
						<p>{{v.detail}}</p>
					</a>
				</li>
			</ul>
		</product>
		<product>
			<h2 slot = "tit">食品营养</h2>
			<ul slot = "pro">
				<li v-for="v in food">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<div><span>{{v.price}}</span><span>{{v.old_price}}</span></div>
						<p>{{v.detail}}</p>
					</a>
				</li>
			</ul>
		</product>
		<product>
			<h2 slot = "tit">全国直邮</h2>
			<ul slot = "pro">
				<li v-for="v in global">
					<a :href="'#/detail'+v.id">
						<img :src="v.src"/>
						<div><span>{{v.price}}</span><span>{{v.old_price}}</span></div>
						<p>{{v.detail}}</p>
					</a>
				</li>
			</ul>
	</product>
	</div>
</template>

<script>
export default{
	name:'home',
	data(){
		return {
			hot:[],
			mom:[],
			dress:[],
			house:[],
			food:[],
			global:[]
		}
	},
	created(){
		this.http.get("http://localhost:8050/hot#/").then((res)=>{
			this.hot = res.data;
		})
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
		if(!localStorage.getItem("refresh")){
			window.location.reload();
			localStorage.setItem("refresh","no")
		}
	},
	components:{
		product:{
			template:"<div class = 'pros'><slot name = 'tit'></slot><slot name = 'pro'></slot></div>"
		}
	}
}
</script>
<style lang = "scss">
.main{
	background: #fafafa;
	margin-bottom: 1rem;
}
.pros{
	h2{
		font-size: 0.28rem;
		color: #333;
		padding-left: 0.7rem;
		background: url(../assets/hot.png) 0.2rem center no-repeat;
		line-height: 1rem;
		background-size:0.3rem 0.4rem;
	}
	ul{
		display:flex;
		justify-content:space-around;
		li{
			width: 3.2rem;
			border: 1px solid #eee;
			background: #fff;
			padding-bottom: 0.2rem;
			img{
				width: 100%;
				vertical-align: middle;
			}
			div{
				overflow: hidden;
				padding: 0 0.23rem;
				span{
					font-size: 0.28rem;
					color:#e60012;
					float:left;
				}
				span+span{
					float:right;
					text-decoration: line-through;
					color:#666;
				}
			}
			p{
				font-size: 0.28rem;
				color:#666;
			}
		}
	}
}
</style>