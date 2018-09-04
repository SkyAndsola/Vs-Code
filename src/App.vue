<!--主页-->
<template>
  <div id="app">
  	<!--你定义的啥-->
 		<headtop :state = "num"></headtop>
 		  <router-view/>
 		<footbottom :state = "num"></footbottom>
  </div>
</template>

<script>
	//这有啥
	import headtop from "@/components/head"
	import footbottom from "@/components/foot"
export default {
	data(){
		return {
			num:0
		}
	},
  name: 'App',
  //这是啥
  components:{headtop,footbottom},
  watch:{
  	$route(){
  		var name = this.$route.name;	
  		this.num = name=="home"?0:this.num;
			this.num = name=="menu"?1:this.num;
			this.num = name=="shop"?2:this.num;
			this.num = name=="me"?3:this.num;
			this.num = name=="detail"?4:this.num;
			this.num = name=="login"?5:this.num;
			this.num = name=="register"?6:this.num;
			localStorage.removeItem("refresh");
  	}
  },
  mounted(){
  	  var name = this.$route.name;
  		this.num = name=="home"?0:this.num;
			this.num = name=="menu"?1:this.num;
			this.num = name=="shop"?2:this.num;
			this.num = name=="me"?3:this.num;
			this.num = name=="detail"?4:this.num;
			this.num = name=="login"?5:this.num;
			this.num = name=="register"?6:this.num;
  }
}
</script>

<style>
	/*默认样式*/
	*{
		margin: 0;
		padding: 0;
	}
	h1,h2,h3,h4,h5,h6{
		font-weight: normal;
	}
	ul,ol,dl{
		list-style: none;
	}
	a{
		text-decoration: none;
	}
	input,button{
		border: none;
		outline: none;
		background: transparent;
	}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
	
}
</style>
