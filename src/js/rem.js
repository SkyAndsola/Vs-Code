window.onload=function(){
	rem(750,100)
}
window.onresize = function(){
	rem(750,100)
}
//a为设计稿的测量数值，b为写数值时放大缩小比率
function rem(a,b){
	var html = document.getElementsByTagName("html")[0];
	var width = document.body.clientWidth||document.documentElement.clientWidth;
	html.style.fontSize = width/a*b + "px";
}
