<template>
	<div class = "details">
		<div class="top">
			<div class = "info" :data="arr">
				<p>{{detail}}</p>
				<div>
					<img src="../assets/shou.png"/>
					<p>收藏</p>
				</div>
			</div>
			<div class = "price">
				<span>{{price}}</span>
				<ul>
					<li>6.5折</li>
					<li>包邮</li>
				</ul>
			</div>
			<div class = "old_price">
				<span>{{old_price}}</span>
				<ul>
					<li>正品货源</li>
					<li>一件代发</li>
					<li>全球直邮</li>
					<li>售后无忧</li>
				</ul>
			</div>
		</div>
		<div class="detail_bottom">
			<div class="tit">
				<h2 @click="bol=!bol" :class="{current:bol}" >商品详情</h2>
				<h2 @click="bol=!bol" :class="{current:!bol}" >买家口碑</h2>
			</div>
			<div class="mess">
				<div class="shop_detail" v-if='bol'>
					<img src="../assets/xiangqing.png"/>
				</div>
				<div class="priaise" v-else>
					<div class="sidetop">
						<ul>
							<li>全部评价</li>
							<li>好评</li>
							<li>差评</li>
							<li>晒单</li>
						</ul>
					</div>
					<div class="main">
						<infoText>
							<div slot = "first">
								<h2>月色花香</h2>
								<span>2015-10-03 21:47:03</span>
							</div>
							<img src="../assets/detail1.png" alt="" slot= "second"/>
							<span slot = "third">已经开始喝第二阶段的奶粉了，会继续支持德贝</span>
							<p slot = "forth">
								管理员：亲爱的用户，已返现到您的会员账户，感谢您对德贝的支持，我们会继续
								给您带来最极致的服务。
							</p>
						</infoText>
						<infoText>
							<div slot = "first">
								<h2>月色花香222</h2>
								<span>2015-10-03 21:47:03</span>
							</div>
							<img src="../assets/detail1.png" alt="" slot= "second"/>
							<span slot = "third">已经开始喝第二阶段的奶粉了，会继续支持德贝</span>
							<p slot = "forth">
								管理员：亲爱的用户，已返现到您的会员账户，感谢您对德贝的支持，我们会继续
								给您带来最极致的服务。
							</p>
						</infoText>
						<infoText>
							<div slot = "first">
								<h2>月色花香333</h2>
								<span>2015-10-03 21:47:03</span>
							</div>
							<img src="../assets/detail1.png" alt="" slot= "second"/>
							<span slot = "third">已经开始喝第二阶段的奶粉了，会继续支持德贝</span>
							<p slot = "forth">
								管理员：亲爱的用户，已返现到您的会员账户，感谢您对德贝的支持，我们会继续
								给您带来最极致的服务。
							</p>
						</infoText>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js" ></script>
<script>
	export default{
		data(){
			return{
				bol:true,
				arr:{},
				detail:'',
				price:'',
				old_price:''
			}
		},
		components:{
			infoText:{
				template:"<div><slot name = 'first'></slot><slot name = 'second'></slot><slot name = 'third'></slot><slot name = 'forth'></slot></div>"
			}
		},
		mounted(){
			var id = this.$route.params.id;
			this.http.get("http://localhost:8050/detail",{params:{'id':id}}).then((res)=>{
				this.arr = res.data;
				this.detail=this.arr[0].detail;
				this.price=this.arr[0].price;
				this.old_price=this.arr[0].old_price
			})
			if(!localStorage.getItem("refresh")){
    			window.location.reload();
    			localStorage.setItem("refresh","no")
    		}
		}
	}
</script>

<style lang = "scss">
	.details{
		margin-bottom: 1.5rem;
		background: #eee;
		padding-top: 1px;
		.top{
			background: #fff;
			padding:0.1rem 0.3rem;
			margin-bottom: 0.2rem;
			.info{
				overflow: hidden;
				>p{
					width: 6rem;
					font-size: 0.3rem;
					color:#333;
					float: left;
				}
				>div{
					float: right;
					width: 0.5rem;
					display: flex;
					flex-direction: column;
					border-left: 1px solid #ddd;
					text-align: center;
					padding-left: 0.2rem;
					img{
						width: 50%;
						margin: 0 auto;
					}
					p{
						font-size: 0.16rem;
						color:#333;
					}
				}
			}
			.price{
				overflow: hidden;
				span{
					font-size: 0.34rem;
					color:#EB2222;
					float: left;
					width: 1.6rem;
				}
				ul{
					float: left;
					li{
						font-size: 0.2rem;
						color: #FFFFFF;
						width: 0.7rem;
						height: 0.3rem;
						line-height: 0.35rem;
						text-align: center;
						background: #FF9900;
						margin-right: 0.2rem;
						float: left;
					}
				}
			}
			.old_price{
				overflow: hidden;
				span{
					font-size: 0.24rem;
					color:#999;
					float: left;
					width: 1.6rem;
					text-decoration: line-through;
				}
				ul{
					float: left;
					li{
						font-size: 0.2rem;
						color: #FF9900;
						width: 1rem;
						height: 0.3rem;
						line-height: 0.35rem;
						text-align: center;
						border: 2px solid #FF9900;
						margin-right: 0.2rem;
						float: left;
					}
				}
			}
		}
		.detail_bottom{
			.tit{
				display: flex;
				justify-content: space-around;
				background: #fff;
				h2{
					font-size: 0.26rem;
					color: #999;
					line-height: 0.90rem;
					&.current{
					color:#FF9900;
				}
				}
			}
			.mess{
				.shop_detail{
					img{
						width: 100%;
					}
				}
				.sidetop{
					font-size: 0.24rem;
					color:#fff;
					ul{
						display: flex;
						justify-content: space-around;
						padding: 0.1rem 0;
						margin-top: 1px;
						background: #fff;
					}
					li{
						background: #999;
						width: 1.35rem;
						height: 0.5rem;
						line-height: 0.5rem;
						text-align: center;
						border-radius: 0.25rem;
					}
				}
				.main{
					border-top:1px solid #ddd;
					>div{
						background: #fff;
						padding: 0  0.3rem 0.2rem;
						margin-bottom: 1px;
					}
					>div>div{
						overflow: hidden;
						h2{
							font-size: 0.24rem;
							color:#ff9900;
							line-height: 0.55rem;
							float:left;
						}
						span{
							float: right;
							font-size: 0.18rem;
							color:#999;
							line-height: 0.55rem;
						}
					}
					img{
						width: 1.5rem;
						height: 1.5rem;
						vertical-align: middle;
					}
					>div>span{
						display: block;
						font-size: 0.20rem;
						color: #999;
						line-height: 0.4rem;
					}
					p{
						font-size: 0.18rem;
						color:#666;
						background: #ddd;
						padding: 0.1rem;
						border-radius: 0.1rem;
					}
				}
			}
		}
	}
</style>