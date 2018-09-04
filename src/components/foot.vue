<template>
	<div class="foot" v-show = "dis">
		<ul ref = "list" v-show="state==1||state==2||state==3||state==0">
			<li class = "current"><a href="#/">
				<img :src="home"/>
				<h3>首页</h3>
			</a></li>
			<li><a href="#/menu1">
				<img :src="menu"/>
				<h3>分页</h3></a>
			</li>
			<li><a href="#/shop2">
					<img :src="shop"/>
					<h3>购物车</h3></a>
			</li>
			<li><a href="#/me3">
				<img :src="me"/>
				<h3>我</h3>
			</a></li>
		</ul>
		<div class="detail_bottom" v-show = "state == 4">
			<div class="total">
				总价：<span>0.00</span>
			</div>
			<div class="buy" @click="buyNow">立即购买</div>
			<div class="shop" @click="buyCar">加入购物车</div>
			<!--登录判定的遮罩层-->
			<transition >
				<div class="bgBuy" v-show = "bolBg"  >
					<div  class = "warning">
						<div class  ="mess">
							<h2>{{text}}</h2>
						</div>
						<div @click="close">确认</div>
					</div>
				</div>
			</transition>
			<!--加入购物车成功遮罩层-->
			<transition >
				<div class="bgBuy" v-show = "bolBuy" >
					<div  class = "warning">
						<div class  ="mess">
							<h2>{{text}}</h2>
						</div>
						<div @click="cl">确认</div>
					</div>
				</div>
			</transition>
			<!--立即购买遮罩层-->
			<transition>
				<div class="ground" v-if = "state_bol">
				</div>
			</transition>
			<transition>
				<div class = "detail_buy" v-if = "state_bol">
					<div class="pic">
						<img :src="src" alt="" />
					</div>
					<button class="close" @click="state_bol=false"></button>
					<div class="info" :data = "arr">
						<span>{{price}}</span>
						<p>库存{{store}}件</p>
						<p>请选择商品属性</p>
					</div>
					<div class="num">
						购买数量
						<span><b @click="add(0)">-</b><input @change="inp" type="text" v-model.number.trim = "num" value ="1"/><b @click="add(1)">+</b></span>
					</div>
					<div class="big">
						<h2>大小</h2>
						<ul >
							<li v-for="(v,k) in big" :class="{current:index == k}" @click="curr(k)">{{v}}</li>	
						</ul>
					</div>
					<div class="age">
						<h2>年龄</h2>
						<ul>
							<li  v-for="(v,k) in age" @click="curr1(k)" :class= "{current:ind == k}">{{v}}</li>
						</ul>
					</div>
					<div class="detail">
						<p>总价:
							<span>{{price * num }}</span>
						</p>
						<button>确定</button>
					</div>
				</div>
			</transition>
			
		</div>
	</div>
</template>

<script>
	//监听
	export default{
		data(){
			return{
				bolBg:false,
				bolBuy:false,
				dis:true,
				log:true,
				index:0,
				ind:0,
				state_bol:false,
				home:require("../assets/tab_home_nor.png"),
				menu:require("../assets/tab_menu_nor.png"),
				shop:require("../assets/tab_shopping_nor.png"),
				me:require("../assets/tab_me_nor.png"),
				arr:{},
				detail:'',
				price:'',
				src:'',
				old_price:'',
				store:'',
				num:1,
				big:["1L","2L","3L","4L"],
				age:["5岁以下","3岁以下"],
				text:''
			}
		},
		props:["state"],
		watch:{
			$route(){
				if(this.$route.name == "detail"){
					var id = this.$route.params.id;
					this.http.get("http://localhost:8050/detail",{params:{'id':id}}).then((res)=>{
						this.arr = res.data;
						this.detail=this.arr[0].detail;
						this.price=this.arr[0].price;
						this.old_price=this.arr[0].old_price;
						this.store = this.arr[0].store;
					})
				}
				if(this.$route.name == "login" || this.$route.name == "register"){
					this.dis = false;
				}else{
					this.dis = true;
				}
				//获取ul
//				var lis = this.$el.getElementsByTagName('li');
				if(this.$route.name != "detail"){
					var lis = this.$refs.list.getElementsByTagName("li");
					for (var i = 0 ; i <lis.length ;i++) {
						lis[i].className="";
					}
					lis[this.$route.params.id==undefined?0:this.$route.params.id].className = "current";
					var path = this.$route.name;
					this.home = path=="home"?require("../assets/tab_home_hig.png"):require("../assets/tab_home_nor.png");
					this.menu = path=="menu"?require("../assets/tab_menu_hig.png"):require("../assets/tab_menu_nor.png");
					this.shop = path=="shop"?require("../assets/tab_shopping_hig.png"):require("../assets/tab_shopping_nor.png");
					this.me = path=="me"?require("../assets/tab_me_hig.png"):require("../assets/tab_me_nor.png");
				}
			}
	},
		mounted(){
			if(this.$route.name != "detail"){
				var lis = this.$refs.list.getElementsByTagName("li");
				for (var i = 0 ; i <lis.length ;i++) {
					lis[i].className="";
				}
				if(this.$route.params.id >= 10){
					this.$route.params.id = 1;
				}
				lis[this.$route.params.id==undefined?0:this.$route.params.id].className = "current";			
				var path = this.$route.name;
				this.home = path=="home"?require("../assets/tab_home_hig.png"):require("../assets/tab_home_nor.png");
				this.menu = path=="menu"?require("../assets/tab_menu_hig.png"):require("../assets/tab_menu_nor.png");
				this.shop = path=="shop"?require("../assets/tab_shopping_hig.png"):require("../assets/tab_shopping_nor.png");
				this.me = path=="me"?require("../assets/tab_me_hig.png"):require("../assets/tab_me_nor.png");
			}
		},
		created(){
			if(this.$route.name == "detail"){
				var id = this.$route.params.id;
				this.http.get("http://localhost:8050/detail",{params:{'id':id}}).then((res)=>{
					this.arr = res.data;
					this.detail=this.arr[0].detail;
					this.price=this.arr[0].price;
					this.src = this.arr[0].src;
					this.old_price=this.arr[0].old_price;
					this.store = this.arr[0].store;
				})
			}
		},
		methods:{
			add(bol){
				if(bol){
					this.num++;
				}else{
					this.num--;
				}
				if(this.num <= 0){
					this.num = 0;
				}
				if(this.num >= this.arr[0].store){
					console.log(31)
					this.num = this.arr[0].store;
				}
			},
			inp(){
				if(this.num <= 0){
					this.num = 0;
				}
				if(this.num >= this.arr[0].store){
					console.log(31)
					this.num = this.arr[0].store;
				}
			},
			curr(k){
				this.index = k;
			},
			curr1(k){
				this.ind = k;
			},
//			加入购物车
			buyCar(){
				if(localStorage.getItem("user")){
					var id = this.$route.params.id;
					var userId = JSON.parse(localStorage.getItem("user")).id;
					this.http.post("http://localhost:8050/buy",'id='+id+'&userId='+userId).then((res)=>{
						localStorage.setItem("user",JSON.stringify(res.data[0]));
						this.bolBuy = true;
						this.text = "加入购物车成功！";
					})
				}else{
					this.bolBg = true;
					this.state_bol = false;
					this.text = "对不起，您还尚未登录，请登录以后进行此操作";
				}
			},
			buyNow(){
				if(localStorage.getItem("user")){
					this.state_bol = true;
				}else{
					this.bolBg = true;
					this.state_bol = false;
					this.text = "对不起，您还尚未登录，请登录以后进行此操作";
				}	
			},
			close(){
				this.bolBg = false;
				this.bolBuy = false;		
				setTimeout(function(){
					window.location.href = '#/login';
				},500)
				
			},
			cl(){
				this.bolBuy = false;
			}
		},
		props:["state"]
	}
</script>
<style lang="scss">
.bgBuy{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		position: relative;
		.warning{
			position:absolute;
			top:30%;
			left:23%;
			background: #fff;	
			overflow:hidden;
			text-align: center;
			border-radius:6px;
			.mess{
				color: #666;
				border-bottom: 1px solid #666;
				width: 4rem;
				h2{
					display: block;
					font-size: 0.3rem;
					text-align: center;
					margin: 0.3rem 0.3rem 0;
				}
			}
			div{
				color:#666;
				font-size: 0.3rem;
				line-height: 0.8rem;
			}
		}	
	}
	.ground{
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,0.5);
		position: fixed;
		bottom: 0;
		z-index: 100;
		left:0;
	}
	.detail_buy{
		width: 100%;
		height: 7rem;
		background: #fff;
		position: fixed;
		bottom: 0;
		z-index: 110;
		left:0;
		.pic{
			width: 2.15rem;
			height: 2.15rem;
			background: #ddd;
			border-radius: 8px;
			text-align: center;
			position:absolute;
			left:0.3rem;
			top:-0.4rem;
			img{
				width: 90%;
				height: 90%;
				position: relative;
				top:5%;
			}
		}
		.close{
			width: 0.6rem;
			height: 0.6rem;
			background: url(../assets/close.png) center center no-repeat;
			background-size: 80% 80%;
			position: absolute;
			top:0.3rem;
			right:0.3rem;
		}
		.info{
			margin-left: 2.9rem;
			
			span{
				font-size: 0.3rem;
				color:#EB2222;
				position: relative;
				top:-0.1rem;
			}
			p{
				font-size: 0.25rem;
				color:#333;
				position: relative;
				top:-0.2rem;
			}	
		}
		.num{
			padding: 0 0.4rem;
			font-size: 0.3rem;
			color:#333;
			line-height: 1rem;
			span{
				float:right;
				line-height: normal;
				overflow: hidden;
				height: 1rem;
				display: flex;
				align-items: center;
				b{
					display: inline-block;
					width: 0.45rem;
					height: 0.45rem;
					background: #999;
					text-align: center;
					line-height: 0.45rem;
					float: left;
				}
				input{
					width: 1rem;
					background: #FFFFFF;
					height: 0.45rem;
					border-top:0.02rem solid #ddd ;
					border-bottom:0.02rem solid #ddd ;
					float: left;
					box-sizing: border-box;
					text-align: center;
				}
			}
		}
		.big,.age{
			padding: 0 0.4rem;
			h2{
				font-size: 0.3rem;
				color:#333;
			}
			ul{
				overflow: hidden;
				display: block;
				margin-top: 0.2rem;
				li{
					display: block;
					width: 1.2rem;
					height: 0.4rem;
					line-height: 0.4rem;
					text-align: center;
					border-radius: 10px;
					background: #DDDDDD;
					float: left;
					margin-right: 0.2rem;	
					color:#fff;
					font-size: 0.25rem;
					&.current{
						background: #FF9900;
					}
				}
			}
				&.age{
					li{
						width: 1.75rem;
					}
			}
		}
		.detail{
			height: 1rem;
			border-top: 1px solid #DDDDDD;
			overflow: hidden;
			p{
				float:left;
				font-size: 0.3rem;
				color:#666;
				line-height: 1rem;
				padding-left: 0.3rem;
				span{
					color:#EB2222;
				}
			}
			button{
				width: 1.5rem;
				text-align: center;
				line-height: 1rem;
				background: #EB2222;
				font-size: 0.3rem;
				color:#fff;
				float: right;
			}
		}
			
	}
	.v-enter-active,.v-leave-active{
		transition: all 0.5s;
	}
	.v-enter,.v-leave-active{
		height:0;
	}
	.foot{
		height: 1rem;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #fff;
		border-top: 2px solid #eee;
		ul{
			display:flex;
			justify-content: space-around;
			font-size: 0.3rem;
			height:1rem;
			li{
				display:flex;
				align-items: center;
				a{
					display: flex;
					flex-direction: column;
					text-align: center;
					img{
						width: 0.4rem;
						height: 0.4rem;
						display: block;
						margin: 0 auto;
					}
					h3{
						font-size: 0.3rem;
						color:#333;
					}
				}
				&.current h3{
					color:#fb9b00;
				}
			}
		}
		.detail_bottom{
			.total{
				width: 3.5rem;
				line-height: 1rem;
				font-size: 0.3rem;
				color:#666;
				span{
					color:#eb2222;
				}
				float:left;
			}
			.shop{
				width: 1.95rem;
				line-height: 1rem;
				float: right;
				background: #FF9900;
				font-size: 0.3rem;
				color:#fff;
				text-align: center;
			}
			.buy{
				background: #EB2222;
				width: 1.95rem;
				line-height: 1rem;
				float: right;
				font-size: 0.3rem;
				color:#fff;
				text-align: center;
			}
		}
	}
</style>