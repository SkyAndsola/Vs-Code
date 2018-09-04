<template>
	<div class="cont">
		<ul class="digital">
			 <li>
		    	<h2>手机号：</h2>
		    	<input type="text" name = "phone" v-model="phone" :data='bolPhone'/>
	    	</li>
	    	<li>
		    	<h2>密码：</h2>
		    	<input type="password" name = "name"v-model="pwd" :data = 'bolPwd'/>
	    	</li>
	   		 <li>
	   		 	<h2>验证码：</h2>
		    	<input type="text" v-model="inf" :data = "bolInf"/>
				<a href="###">点击获取</a>
			</li>
		</ul>
		<input type="button" value="下一步" class = "btn" @click="btn()"/>
		<div class="agree">
			<input type="checkbox" @click="change()"/>
		    <p :data="bol">我已阅读并同意使用条款和隐私政策</p>
		</div>
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
	</div>
</template>
<script src="http://libs.baidu.com/jquery/1.9.0/jquery.js" ></script>
<script>
	export default{
		data(){
			return{
				state_bol:false,
				bol:false,
				bolPhone:false,
				bolPwd:false,
				bolInf:false,
				bolBg:false,
				phone:'',
				inf:'',
				pwd:'',
				text:''
			}
		},
		methods:{
			btn(){
				var regPhone = /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				var regPwd = /^\w{6,16}$/;
				var regInf = /^\d{4}$/;
				if(regPhone.test(this.phone)){
					this.bolPhone=true;
				}else{
					this.bolPhone=false;
					this.bolBg = true;
					this.text = "请输入正确的电话号码！";
					return;
				}
				if(regPwd.test(this.pwd)){
					this.bolPwd=true;
				}else{
					this.bolPwd=false;
					this.bolBg = true;
					this.text = "请输入有效的密码！有效的密码应有6-16位，由字母，数字组成!";
					return;
				}
				if(regInf.test(this.inf)){
					this.bolInf=true;
				}else{
					this.bolInf=false;
					this.bolBg = true;
					this.text = "您输入的验证码错误，请重新输入！";
					return;
				}
				if(this.bolInf && this.bolPhone && this.bolPwd){
					this.http.post("http://localhost:8050/register",'phone='+this.phone+'&pwd='+this.pwd).then((res)=>{
						console.log(res.data);
					})
				}
			},
			change(){
				this.bol = !this.bol;
				if(this.bol == false){
					$(".btn").attr("disabled","disabled");
				}else{
					$(".btn").removeAttr("disabled");
				}
			},
			close(){
				this.bolBg = false;
			}
		},
		mounted(){
			$(".btn").attr("disabled","disabled");
		}
	}
</script>

<style lang="scss">
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
	.v-enter-active,.v-leave-active{
		transition: all 0.5s;
	}
	.v-enter,.v-leave-active{
		height:0;
	}
	.cont{
		background: #ffffff;
		padding-bottom: 4.5rem;
		.digital{
			margin-top: 2rem;
			margin-left: 0.75rem;
			li{
				overflow: hidden;
				h2{
				font-size: 0.32rem;
				color: #333333;
				line-height: 1.25rem;
				float:left;	
				}
				input{
					font-size: 0.32rem;
					color: #333333;
					line-height: 1.25rem;	
					float:left;	
				}
			}
			li{
				width: 6rem;
				border-bottom: 1px solid #707070;
			}
			li:nth-child(3){
				overflow: hidden;
				input{
					width:3rem;
				}
				a{
					float: right;
					font-size: 0.28rem;
					color: #fe0041;
					line-height: 1.3rem;
					margin-right: 0.2rem;
				}
			}
		}
		.btn{
			display: block;
			margin-top: 0.5rem;
			width: 6rem;
			line-height: 1rem;
			font-size: 0.32rem;
			color: #ffffff;
			background: #ff9900;
			border-radius: 0.08rem;
			text-align: center;
			margin-left: 0.75rem;
		}
		.agree{
			margin-top: 1rem;
			margin-left: 0.75rem;
			width: 6rem;
			overflow: hidden;
			input{
				display: block;
				width: 0.28rem;
				height: 0.28rem;
				float: left;
				margin-right: 0.2rem;
				margin-top: 0.06rem;
			}
			p{
				display: inline;
				width: 4.5rem;
				font-size: 0.28rem;
				color: #666666;
				margin-left: -0.1rem;
				float: left;
			}
		}
	}
</style>
