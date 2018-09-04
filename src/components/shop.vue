<template>
	<div v-if = "!large">
		<div v-if = "have" class = "shop_big">
			<div class="goods" >
				<ul>
					<li v-for="(v,k) in data">
						<h2>{{v.address}}</h2>
						<div :class = "{on:v.del}">
							<div class = "ed" @click="sel(k)">
								<img :src="v.state?hig:nor"/>
							</div>
							<div class = "pic">
								<img :src="v.src" alt="" />
							</div>
							<div>
								<div class="info">
									<p>{{v.detail}}<span class="span">{{v.size+"粒装"}}</span></p>
									<span class = "num"><b @click="add(0,k)">-</b><input type="text" v-model.number.trim = "v.num"/><b @click="add(1,k)">+</b></span>
								</div>
							</div>
							<div>
								<div class="total">
									{{v.price*v.num}}
								</div>
							</div>
							<div  v-if= "v.del == true">
								<div class="del" @click="del(k)">
									删除
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="res">
					<div class="all" @click="all">
						<img :src="all_bol?hig:nor"/>
						<p>全选</p>
					</div>
					<div class="edit" @click="edit">
						<img src="../assets/shop_nor.png" alt="" />
						<p>编辑</p>
					</div>
					<div class="balance">
						去结算
					</div>
					<div class="total">
						<p>合计：<span>{{totals}}</span></p>
						<p>(不计运费)</p>
					</div>
					
				</div>
			</div>
		</div>
		<div class="shop_car" v-else>
			<img src="../assets/tab_shopping_nor.png" alt=""/>
			<p>购物车还是空的
				快去逛逛吧...
			</p>
		</div>
	</div>
	<div v-else>
			<transition>
					<div class="bgBuy" v-show = "bolBuy" >
						<div  class = "warning">
							<div class  ="mess">
								<h2>对不起，您还尚未登录，请登录完成以后再进行此操作！</h2>
							</div>
							<div @click="close">确认</div>
						</div>
					</div>
			</transition>
	</div>
</template>
<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js" ></script>
<script>           
	export default{
		data(){
			return {
				hig:require("../assets/editor_on.png"),
				nor:require("../assets/editor_nor.png"),
				all_bol : true,
				have:true,
				bolbuy:false,
				data:[],
				large:false
			}
		},
		mounted(){
			if(localStorage.getItem("user")){	
				this.large = false;
				if(JSON.parse(localStorage.getItem("user")).proId){
					var proId = JSON.parse(localStorage.getItem("user")).proId;
					var length = proId.split(",").length;
					this.have = true;
					this.http.post("http://localhost:8050/shop","proId="+proId).then((res)=>{
						for(var i = 0 ; i< length;i++){
							this.data.push(res.data[i][0])
						}
					})	
				}else{
					this.have = false;
				}
			}else{
				this.large = true;
			}
		},
		created(){
			if(localStorage.getItem("user")){
				this.bolBuy = false;
			}else{
				this.bolBuy = true;
			}
		},
		computed:{
			totals(){
				var s = 0;
				this.data.forEach((el)=>{
				if(el.state){
						s+=el.price*el.num
					}
				})
				return s;
			}
		},
		methods:{
			add(bol,k){
				if(bol){
					this.data[k].num++;
				}else{
					this.data[k].num--;
				}
				if(this.data[k].num <= 0){
					this.data[k].num = 0;
				}
				if(this.data[k].num >= this.data[k].nums){
					this.data[k].num = this.data[k].nums;
				}
			},
			sel(k){
				this.data[k].state = !this.data[k].state;
				var bol = true;
				this.data.forEach((el)=>{
					if(!el.state){
						bol = false;
					}
				})
				if(bol){
					this.all_bol = true;
				}else{
					this.all_bol = false;
				}
			},
			all(){
				this.all_bol = !this.all_bol;
				if(this.all_bol){
					this.data.forEach((el)=>{
						el.state = true;
					})
				}else{
					this.data.forEach((el)=>{
						el.state = false;
					})
				}
			},
			edit(){
				this.data.forEach((el)=>{
					if(el.state){
						el.del = true;
					}else{
						el.del = false;
					}
				})
			},
			del(k){
				this.data.splice(k,1);
				var proId = JSON.parse(localStorage.getItem("user")).proId.split(",");
				var id = JSON.parse(localStorage.getItem("user")).id;
				var arr = new Array();
				$.each(proId,function(k,v){
				    arr.push(v);
				});
				arr.splice(k,1);
				if(arr == ""){
					this.have = false;
				}else{
					this.have = true;
				}
				this.http.post("http://localhost:8050/del","proId="+arr+"&id="+id).then((res)=>{
					localStorage.setItem("user",JSON.stringify(res.data[0]));
				})
			},
			close(){
				this.bolBuy = false;		
				setTimeout(function(){
					window.location.href = '#/login';
				},500)
			}
		}
	}
</script>

<style lang = "scss">
.v-enter-active,.v-leave-active{
		transition: all 0.5s;
	}
	.v-enter,.v-leave-active{
		height:0;
	}
.bgBuy{
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,0.5);
	position: fixed;
	bottom: 0;
	z-index: 100;
	left:0;
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
.shop_big{
	margin-bottom: 2rem;
	.res{
		width: 100%;
		height: 1.0rem;
		background: #fff;
		position: fixed;
		left:0;
		bottom:1rem;
		font-size:0.28rem;
		color:#666;
		text-align:center;
		.all{
			width: 0.9rem;
			float: left;
			margin-left: 0.35rem;
			margin-right: 0.5rem;
			padding: 0.03rem 0;
			img{
				width: 0.47rem;
				height: 0.47rem;
			}
		}
		.edit{
			float: left;
			img{
				width: 0.50rem;
				height: 0.50rem;
			}
		}
		.balance{
			width: 2.3rem;
			line-height: 1rem;
			text-align: center;
			color:#fff;
			background: #ff5500;
			float: right;
			font-size: 0.37rem;
		}
		.total{
			float: right;
			width: 2.6rem;
			margin-top: 0.2rem;
			font-size: 0.23rem;
			color:#999;
		}
	}
	.goods{
		font-size: 0.3rem;
		overflow: hidden;
		li{
			border-bottom:1px solid #ddd;
			h2{
				font-size: 0.28rem;
				color:#999;
				line-height: 1rem;
				padding-left: 0.95rem;
				background: url(../assets/store.png) 0.35rem center no-repeat;
				background-size: 6% 45%;
			}
		}
		li>div{
			&.on{
				padding-right: 0;
			}
			justify-content:space-between;
			display: flex;
			align-items: center;
			padding-left: 0.35rem;
			padding-right: 0.65rem;
			.ed{
				img{
					width: 0.5rem;
					height: 0.5rem;
				}
			}
			.pic{
				img{
					width: 2rem;
					height: 2rem;
				}	
			}
			.del{
				text-align: center;
				color:#fff;
				height:2rem;
				line-height: 2rem;
				background: #FF9900;
				width: 1rem;
			}
		}
		li>div>div{
			float: left;
			.info{
				width: 3rem;
				p{
					font-size: 0.32rem;
					margin: 0.1rem 0 0.03rem;
					span{
						font-size: 0.28rem;
						padding-left: 0.28rem;
						color: #999;
						line-height: 0.5rem;
   						margin-right: 0.9rem;
					}
				}
				.num{
					line-height: normal;
					overflow: hidden;
					height: 1rem;
					display: flex;
					align-items: center;
					b{
						display: inline-block;
						width: 0.75rem;
						height: 0.45rem;
						background: #fff;
						text-align: center;
						line-height: 0.45rem;
						float: left;
						border: 2px solid #ccc;
					}
					input{
						width: 1rem;
						background: #FFFFFF;
						height: 0.45rem;
						float: left;
						text-align: center;
						font-size: 0.32rem;
						border-bottom: 2px solid #ccc;
						border-top:2px solid #ccc;
					}
			}
			}
		}
	}
}
	.shop_car{
		text-align: center;
		margin: 0 auto;
		img{
			margin-top: 3.3rem;
		}
		p{
			width: 2.35rem;
			font-size: 0.32rem;
			color:#333;
			margin: 0 auto;
		}
	}
</style>