<template>
	<div class="sub1">
	    <div class = "inf">
	    	<h2>手机号：</h2>
	    	<input type="text" :data="bolPhone" v-model="phone"/>
	    </div>
	    <div  class = "inf">
	    	<h2>密码：</h2>
	    	<input type="password" :data="bolPwd" v-model="pwd"/>
	    </div>
	    <p>忘记密码</p>
	    <div class = "log"  @click="btn()">登录</div>
	   <transition>
			<div class="bg" v-show = "bolBg">
				<div  class = "warning">
					<div class  ="mess">
						<h2>{{text}}</h2>
					</div>
					<div @click="close">确认</div>
				</div>
			</div>
		</transition>
	</transition>
	</div>
	
</template>
<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js" ></script>
<script>
	export default{
		data(){
			return{
				bolBg:false,
				phone:'',
				bolPhone:false,
				bolPwd:false,
				pwd:'',
				text:''
			}
		},
		methods:{
			btn(){
				this.http.get("http://localhost:8050/login",{params:{phone:this.phone,pwd:this.pwd}}).then((res)=>{
					if(res.data == "1"){
						this.text = "对不起，用户名不存在！";
						this.bolBg = true;
					}else if(res.data == "2"){
						this.text = "对不起，密码不正确，请重新输入！";
						this.bolBg = true;
					}else if(res.data == "3"){
						this.text = "对不起，用户名不能为空！";
					}else{
						localStorage.setItem("user",JSON.stringify(res.data[0]));
						window.location.href= '#/me3';
					}
				})
			},
			close(){
				this.bolBg = !this.bolBg;
			}
		}
	}
</script>

<style lang="scss">
	.v-enter-active,.v-enter-active{
		transition: all 0.5s;
	}
	.v-enter,.v-leave-active{
		height: 0;
	}
	.bg{
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
	.sub1{
		margin-top: 1.83rem;
		margin-left: 0.72rem;
		width: 6rem;
		.inf{
			overflow: hidden;
			border-bottom: 1px solid #a3a3a3;
			h2{
				line-height: 1.3rem;
				height:1.3rem;
				float: left;
				font-size:0.32rem;
			}
			input{
				float:left;
				line-height: 1.3rem;
				height:1.3rem;
				font-size: 0.32rem;
			}
		}
		p{
			text-align: right;
			font-size: 0.28rem;
			line-height: 1rem;
			color:#666666;
		}
		.log{
			line-height: 1rem;
			width: 6rem;
			font-size: 0.37rem;
			color:#fff;
			background-color: #ff9900;
			border-radius: 0.08rem
		}
	}
</style>