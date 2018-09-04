<template>
	<div class="personal">
		<div class="login" v-show="bolTab">
			<div class="mine">
				<img src="../assets/login-1.png" alt="" />
				<h2>个人中心</h2>
				<img src="../assets/login-2.png" alt="" />
			</div>
			<div class="collection">
				<a class="btn" href="###"></a>
				<h3><a href="#/login">点击登录</a></h3>
				<img src="../assets/login-3.png" alt="" />
				<p>我的收藏</p>
			</div>
			
			<div class="order">
				<p>我的订单</p>
				<a href="###">查看全部订单</a>
		    </div>	
				
				
			<ul class="serve">
				<li>
					<a href="###">
					    <img src="../assets/login-4.png" alt="" />
				        <h3>待付款</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-5.png" alt="" />
				        <h3>待发货</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-6.png" alt="" />
				        <h3>待收货</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-7.png" alt="" />
				        <h3>待评价</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-8.png" alt="" />
				        <h3>退款/售后</h3>
				    </a>
				</li>
				
			</ul>
			
			
			<div class="manage">
				<h2>收货地址管理</h2>
			</div>
			
			
		</div>
		
		
		
		
		
		
		<div class="logined" v-show = "!bolTab">
			<div class="mine">
				<img src="../assets/login-1.png" alt="" />
				<h2>个人中心</h2>
				<img src="../assets/login-1.png" alt="" />
			</div>
			<div class="collection">
				<a class="btn" href="###"><img src="../assets/logined-2.png"/></a>
				<h3>小不点儿</h3>
				<img src="../assets/login-3.png" alt="" />
				<p>我的收藏     (5)</p>
			</div>
			
			<div class="order">
				<p>我的订单</p>
				<a href="###">查看全部订单</a>
		    </div>	
				
				
			<ul class="serve">
				<li>
					<a href="###">
					    <img src="../assets/login-4.png" alt="" />
				        <h3>待付款</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-5.png" alt="" />
				        <h3>待发货</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-6.png" alt="" />
				        <h3>待收货</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-7.png" alt="" />
				        <h3>待评价</h3>
				    </a>
				</li>
				
				<li>
					<a href="###">
					    <img src="../assets/login-8.png" alt="" />
				        <h3>退款/售后</h3>
				    </a>
				</li>
				
			</ul>
			
			
			<div class="manage">
				<h2>收货地址管理</h2>
			</div>
			
		</div>
		
		
	</div>
</template>

<script>
	export default{
		data(){
			return{
				bolTab:true
			}
		},
		mounted(){
			var user = localStorage.getItem("user");
			if(user){
				this.bolTab = false;
			}else{
				this.bolTab = true;
			}
		}
	}
</script>

<style lang="scss">
	.personal{
		.login{
			margin-bottom:1rem;
			background: #efeeee;
			padding-bottom: 1.3rem;
			.mine{
				padding-top: 0.7rem;
				height: 3.7rem;
				background: #ff9900;
				display: flex;
				justify-content: space-around;
				position: relative;
				img{
					width: 0.5rem;
					height: 0.5rem;
				}
				
				h2{
					font-size: 0.41rem;
					color: #fefefe;
				}
				
			}
			.collection{
				height: 2.65rem;
				overflow: hidden;
				background: #fafafa;
				.btn{
					width: 1.85rem;
					height: 1.85rem;
					border:0.15rem solid #ffffff;
					background: #e6dfdf;
					position: absolute;
					border-radius:50% ;
					left: 50%;
					margin-left: -0.92rem;
					top:3.2rem;
				}
				h3{
					font-size: 0.32rem;
					color: #333333;
					margin: 1.2rem 2.9rem 0.5rem 3.2rem;
				}
				img{
					width: 0.38rem;
					height: 0.36rem;
					float: left;
					margin-left: 0.35rem;
				}
			
				p{
				    font-size: 0.34rem ;
					color: #333333;
					float: left;
					margin-left: 0.24rem;
				}
				
			}
			.order{
					margin-top: 0.15rem;
					background: #fafafa;
					overflow: hidden;
					line-height: 1.2rem;
					border-bottom: 1px solid #b3b3b3;
					
					P{
						float: left;
						font-size: 0.33rem;
						color: #333333;
						margin-left: 0.35rem;
					}
					a{
						float: right;
						font-size: 0.33rem;
						color: #b9b9b9;
					}
			    }
			.serve{
				width: 100%;
				background: #fafafa;
				display: flex;
				justify-content: space-around;
				li{
					margin-bottom:0.45rem;
					a{
						display: block;
						text-align: center;
					}
				    img{
				    	width: 0.59rem;
				    	height: 0.46rem;
				    }
				    h3{
				    	font-size: 0.23rem;
				    	color: #666666;
				    }
				}
			}
			.manage{
				margin-top: 0.15rem;
				background: #fafafa;
				h2{
					margin-left: 0.35rem;
					font-size: 0.33rem;
					color: #cacaca;
					line-height: 1.3rem;
				}
			}
			
		}
			.logined{
			margin-bottom:1rem;
			background: #efeeee;
			padding-bottom: 1.3rem;
			.mine{
				padding-top: 0.7rem;
				height: 3.7rem;
				background: #ff9900;
				display: flex;
				justify-content: space-around;
				position: relative;
				img{
					width: 0.5rem;
					height: 0.5rem;
				}
				h2{
					font-size: 0.41rem;
					color: #fefefe;
				}
				h2+img{
					width: 0.75rem;
					height: 0.6rem;
					margin-right: -0.5rem;
				}
				
			}
			.collection{
				height: 2.65rem;
				overflow: hidden;
				background: #fafafa;
				.btn{
					width: 1.85rem;
					height: 1.85rem;
					border:0.15rem solid #ffffff;
					background: #e6dfdf;
					position: absolute;
					border-radius:50% ;
					left: 50%;
					margin-left: -0.92rem;
					top:3.2rem;
					img{
						width: 100%;
						height: 100%;
						margin-left: 0;
					}
				}
				h3{
					font-size: 0.32rem;
					color: #333333;
					margin: 1.2rem 2.9rem 0.5rem 3.2rem;
				}
				img{
					width: 0.38rem;
					height: 0.36rem;
					float: left;
					margin-left: 0.35rem;
				}
			
				p{
				    font-size: 0.34rem ;
					color: #333333;
					float: left;
					margin-left: 0.24rem;
				}
				
			}
			.order{
				margin-top: 0.15rem;
				background: #fafafa;
				overflow: hidden;
				line-height: 1.2rem;
				border-bottom: 1px solid #b3b3b3;
				P{
					float: left;
					font-size: 0.33rem;
					color: #333333;
					margin-left: 0.35rem;
				}
				a{
					float: right;
					font-size: 0.33rem;
					color: #b9b9b9;
				}
			}
			.serve{
				width: 100%;
				background: #fafafa;
				display: flex;
				justify-content: space-around;
				li{
					margin-bottom:0.45rem;
					a{
						display: block;
						text-align: center;
					}
				    img{
				    	width: 0.59rem;
				    	height: 0.46rem;
				    }
				    h3{
				    	
				    	font-size: 0.23rem;
				    	color: #666666;
				    }
				    &:nth-child(2) img,&:nth-child(3) img{
				    	width: 0.75rem;
				    	height: 0.62rem;
				    	margin-left: 0.1rem;
				    }
				}
			}
			.manage{
				margin-top: 0.15rem;
				background: #fafafa;
				h2{
					margin-left: 0.35rem;
					font-size: 0.33rem;
					color: #cacaca;
					line-height: 1.3rem;
				}
			}
			
		}
	}
	
	
	

</style>






