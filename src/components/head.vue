<template>
	<div class="head">
		<!--首页轮播-->
		<div id="container"  class = "ban_top" v-show="state==0" key = "home">
			<form action="" method="post">
				<input type="text" class = "info" />
				<input type="submit" class = "sub" value="" />
			</form>
			<swiper  :options="swiperOption" ref="mySwiper">
				<template v-for="(v,k) in srcurl">
					<swiper-slide class="swiper-slide games">
						<img :src="v" alt="">
					</swiper-slide>   
				</template>
				<div class="swiper-pagination" slot="pagination"></div> 
			</swiper>     
		</div>
		<div class = "menu_top" v-show="state==1">
			<div class="back"  @click="back"></div>
			<form action="" method="post">
				<input type="text" class = "info" />
				<input type="submit" class = "sub" value="" />
			</form>
		</div>
		<div id="container" class = "detail_top" v-show="state==4" key = "detail">
			<div class="nav">
				<div>
					<div class="back"  @click="back"></div>
					<div class="menu"></div>
					<div class="shop"></div>
				</div>
					
			</div>
			<!--详情页轮播-->
			<swiper class = "swip"  :options="swiperOption" ref="mySwiper">
				<template v-for="(v,k) in curl">
					<swiper-slide class="swiper-slide games">
						<img :src="v" alt="">
					</swiper-slide>   
				</template>
				<div class="swiper-pagination" slot="pagination"></div> 
			</swiper>     
		</div>
		<div class="shop_car" v-show="state==2">
			<div class="back"  @click="back"></div>
			<h2>购物车</h2>
		</div>
		  <div class="log" v-show="state==5">
				<div @click="back" class  = "back"></div>
				<h2>登录</h2>
				<h2><a href="#/register">注册</a></h2>
		</div>
		<div class="log" v-show="state==6">
			<div @click="back" class = "back"></div>
			<h2>注册</h2>
			<h2><a href="#/login">登录</a></h2>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				srcurl:[require("../assets/ban1.png"),require("../assets/ban1.png"),require("../assets/ban1.png")],
				curl:[],
				swiperOption: {
					loop:true,
					autoplay : {
						delay: 2000,
						disableOnInteraction:false
					},
					pagination: {       
						el: '.swiper-pagination',
						clickable :true, //点击分页器的指示点分页器会控制Swiper切换     
					}
				} 
			}
		},
		props:['state'],
		methods:{
			back(){
				history.back();
			}
		},
		mounted(){
			if(this.$route.params.id){
				var id = this.$route.params.id;
				this.http.get("http://localhost:8050/detail",{params:{"id":id}}).then((res)=>{
					var src = res.data[0].src;
					this.curl = [src,src,src]
				})
			}
		}
		
	}
</script>

<style lang = "scss"> 
	.swiper-container{
		z-index: 0;	
	}
	.log{
		display: flex;
		justify-content: space-around;
		line-height: 0.95rem;
		background: #ff9900;
		.back{
			margin-top: 0.26rem;
		    width: 0.5rem;
	    	height: 0.45rem;
			background: url(../assets/icon_back.png) center center no-repeat;
			background-size: 40% 50%;
			margin-left:-0.6rem ;
		}
		h2{
			font-size: 0.37rem;
			color: #ffffff;
			margin-left: 0.3rem;
		}
		h2+h2{
			margin-right: -0.3rem;
			width: 0.75rem;
			a{
				color: #fff;
				font-size: 0.37rem;
			}
		}
		
	}


	.swip{
		z-index:0;
	}
	.head{
		.shop_car{
			height: 1rem;
			background: #FB9B00;
			position:relative;
			.back{
					position: absolute;
					left:0.4rem;
					top:0.25rem;
					background:url(../assets/icon_back.png) 0 center no-repeat;
					background-size: 50% 70%;
					width: 0.5rem;
					height: 0.5rem;
				}
			h2{
				font-size: 0.42rem;
				color:#fff;
				text-align: center;
				line-height: 1rem;
			}
		}
		.ban_top{
			position:relative;
			>form{
				width: 4.75rem;
				height: 0.6rem;
				background: #fedbe4;
				border-radius: 0.13rem;
				position: absolute;
				left: 50%;
				top:0.3rem;
				transform: translateX(-50%);
				z-index: 10;
				input{
					float:left;
					&.info{
						width:4.2rem;
						height: 0.6rem;
						line-height: 0.6rem;
						background: #fedbe4;
					}
					&.sub{
						height: 0.6rem;
						width: 0.55rem;
						background: url(../assets/search.png) center center no-repeat;
						background-size: 80% 80%;
					}
				}
				padding:0 0.2rem 
			}
			img { 
				width: 100%;
				vertical-align: middle;
			}
		}
		.menu_top{
			height: 1rem;
			position:relative;
			background: #FB9B00;
			.back{
				    position: absolute;
				    top: 0.25rem;
				    left: 0.2rem;
				    width: 0.5rem;
			    	height: 0.45rem;
					background: url(../assets/icon_back.png) center center no-repeat;
					background-size: 40% 50%;
				}
				>form{
					width: 4.75rem;
					height: 0.6rem;
					background: #fedbe4;
					border-radius: 0.13rem;
					position: absolute;
					left: 50%;
					top:0.2rem;
					transform: translateX(-50%);
					z-index: 10;
					input{
						float:left;
						&.info{
							width:4.2rem;
							height: 0.6rem;
							line-height: 0.6rem;
							background: #fedbe4;
						}
						&.sub{
							height: 0.6rem;
							width: 0.55rem;
							background: url(../assets/search.png) center center no-repeat;
							background-size: 80% 80%;
						}
					}
					padding:0 0.2rem 
				}
			}
		.detail_top{
			position:relative;
			.nav{
				position:fixed;
				width: 100%;
				top:0;
				left:0;
				height: 0.55rem;
				z-index: 10;
				padding:0.05rem 0; 
				>div{
					height:0.55rem;
					padding:0 0.2rem; 
					div{
						width: 0.55rem;
						height: 0.55rem;
						border-radius: 50%;
						background: #b2b2b2;	
					}
				.back{
					float: left;
					background:#b2b2b2 url(../assets/icon_back.png) center center no-repeat;
					background-size: 40% 50%;
				}
				.menu{
					float: right;
					background:#b2b2b2 url(../assets/icon_menu.png) center center no-repeat;
					background-size: 40% 50%;
				}
				.shop{
					float:right;
					margin-right: 0.4rem;
					background:#b2b2b2 url(../assets/icon_shopping.png) center center no-repeat;
					background-size: 40% 50%;
				}
				
				
				}
				
				
			}
			img {
				margin-top: 0.6rem; 
				width: 100%;
				height: 80%;
				vertical-align: middle;
		}
	}
	}	
</style>