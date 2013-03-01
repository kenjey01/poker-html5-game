/**
*  game JS
*/

var poker_ = new Array("-317px 0px","0px -457px","0px -343px","0px -229px","0px -114px","0px 0px","-158px -457px","-158px -343px","-158px -229px","-158px -114px","-158px 0px","-317px -457px","-317px -343px","-317px -229px");
//桌面的扑克
var table;
//扑克背景
var poker_b = 1;
//翻开的扑克
var fliped;
//扑克点数数组
var poker_point;
var game_time = 0;
//时钟开始位置
var clock_start = Math.PI * 1.5 ;
//时钟计时器
var clock_int;
//记忆时间计时器
var mem_time;
//是否开启音效
var is_sound = 1;


function init(difficulty){
	//ready倒数3秒
	ready_3s();
	setTimeout(init_continue, 2700);
	
	table = new Array();
	fliped = new Array();
	poker_point = new Array();
	game_time = 0;
	var poker_n = 0 ; //牌数
	var type_seed = 0 ; //花色数
	switch (difficulty){
		case "hard":
			poker_n = 24;type_seed=4;break;
		case "normal":
			poker_n = 16;type_seed=2;break;
		case "easy":
			poker_n = 8;type_seed=1;break;
	}
	//var table_tmp = new Array();
	
	//初始化扑克背景
	poker_b = Math.floor(Math.random()*4+1);//1-4随机
	//初始化时钟表面
	ready2start(-1);
	
	for(var itmp=0; itmp<poker_n; itmp++){
		var element = document.getElementById("poker_"+itmp);
		element.style.backgroundImage = "url(./images/poker"+poker_b+".png)";
		element.style.backgroundPosition = poker_[0];
		element.style.cursor = "pointer";
	}
	
	var poker_arr = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);
	//初始化牌局
	while(table.length<poker_n){
		var rand_n = Math.floor(Math.random()*(poker_arr.length));//随机一个元素
		var rand_p = poker_arr.splice(rand_n,1);
		poker_point.push(rand_p);
		// if(table_contain(rand_p)){
			// continue;
		// }
		var rand_type = Math.floor(Math.random()*type_seed+1) ;
		var object1 = {
			"type1": rand_type.toString() ,
			"number": rand_p
		};
		rand_type = Math.floor(Math.random()*type_seed+1) ;
		var object2 = {
			"type1":  rand_type.toString() ,
			"number": rand_p
		};
		//test
		
		table.push(object1);
		table.push(object2);
	}

	//乱序处理
	table = arrayShuffle(table);
	//顺序处理
	poker_point.sort(function(a,b){return a-b;});
}

function init_continue(){
	
	/*
	var poker_n = 0 ; //牌数
	var type_seed = 0 ; //花色数
	switch (difficulty){
		case "hard":
				poker_n = 24;type_seed=4;break;
	}
	//var table_tmp = new Array();
	
	//初始化扑克背景
	poker_b = Math.floor(Math.random()*4+1);//1-4随机
	for(var itmp=0; itmp<poker_n; itmp++){
		var element = document.getElementById("poker_"+itmp);
		element.style.backgroundImage = "url(./images/poker"+poker_b+".png)";
		element.style.backgroundPosition = poker_[0];
	}
	
	var poker_arr = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);
	//初始化牌局
	while(table.length<poker_n){
		var rand_n = Math.floor(Math.random()*(poker_arr.length));//随机一个元素
		var rand_p = poker_arr.splice(rand_n,1);
		poker_point.push(rand_p);
		// if(table_contain(rand_p)){
			// continue;
		// }
		var rand_type = Math.floor(Math.random()*type_seed+1) ;
		var object1 = {
			"type1": rand_type.toString() ,
			"number": rand_p
		};
		rand_type = Math.floor(Math.random()*type_seed+1) ;
		var object2 = {
			"type1":  rand_type.toString() ,
			"number": rand_p
		};
		//test
		
		table.push(object1);
		table.push(object2);
	}

	//乱序处理
	table = arrayShuffle(table);
	//顺序处理
	poker_point.sort(function(a,b){return a-b;});
	 */
	
	
	//掀开所有
	openALL();
	//倒数5s
	
	//记忆时间
	var memory_time = poker_point.length/2+1;
	ready2start(memory_time);
	//延时后重新翻转所有牌
	var timeout = setTimeout(hideALL, memory_time * 1000);
	
	//disappear("poker_5");
}

function ready_2(id1,id2){
	if(id2=="ready_0"){
		document.getElementById("readyDIV").style.display = "none";
		document.getElementById("middle").style.display = "none";
		return;
	}
	document.getElementById(id1).style.display = "none";
	var aName = "ready2";
	var aTime = "0.2s";
	var element = document.getElementById(id2);
	element.style.webkitAnimation = "" + aName + " " + aTime;
	element.style.display = "block";
}

function ready_1(id1,id2){
	
	var aName = "ready1";
	var aTime = "0.2s";
	var element = document.getElementById(id1);
	setTimeout(ready_2, 200,id1,id2);
	element.style.webkitAnimation = "" + aName + " " + aTime;
	
}

function ready_3s(){
	document.getElementById("readyDIV").style.display = "block";
	document.getElementById("middle").style.display = "block";
	document.getElementById("ready_1").style.display = "none";
	document.getElementById("ready_4").style.display = "block";
	//document.getElementById("ready_4").style.display = "block";
	ready_1("ready_4","ready_3");
	for (var itmp=3;itmp>0;itmp--){
		//document.getElementById("ready_"+itmp).style.display = "block";
		setTimeout(ready_1, 900*(4-itmp),"ready_"+itmp,"ready_"+(itmp-1));
	}
}

function ready2start(time){
	//alert(time);
	var canvas = document.getElementById("clock");
	if(canvas == null){
		return false;
	}
	var context = canvas.getContext('2d');
	//表面颜色 蓝底2b7b9a  红底 ce3c58 底牌颜色poker_b
	var pokerColor = new Array("#ce3c58","#ce3c58","#2b7b9a","#2b7b9a");
	context.fillStyle = pokerColor[poker_b-1];
	context.fillRect(0,0,114,114);
	
	if(time==-1){
		return ;
	}
	//开始位置
	//var start = Math.PI * 1.5;
	var end =  Math.PI * 1.5;
	for(var itmp = 1 ; itmp <= time ; itmp++ ){
		end = clock_start + Math.PI *2 /time * itmp;
		//指针颜色2dd775
		mem_time = setTimeout(drawTime,1000*itmp, "#1ded0d" , clock_start , end  );
	}
	
}


function drawTime(color,start,end){
	var canvas = document.getElementById("clock");
	if(canvas == null){
		return false;
	}
	var context = canvas.getContext('2d');
	context.beginPath();
	context.moveTo(57,57);
	context.arc(57,57,57,start,end,false);
	context.moveTo(57,57);
	context.closePath();
	context.fillStyle = color;
	context.fill();
}

/*
function table_contain(num){
	for(var itmp=0;itmp<table.length;itmp++){
		if(table[itmp].number == num){
			return true;
		}
	}
	return false;
}*/

function openALL(){
	if(is_sound==1){
		var sound1 = document.getElementById("sound1");
		sound1.play();
	}
	var aName = 'open1';
	var aTime = '0.3s';
	//var unflipName = 'unflip';
	//var unflipTime = '0.3s';
	//test
	//alert(table[23].type1);
	for(var itmp=0; itmp<table.length; itmp++){
		var element = document.getElementById("poker_"+itmp);
		element.style.webkitAnimation = "" + aName + " " + aTime;
		/*addEvent( element, 'webkitAnimationEnd', function() {
			//alert(this.id);
			//removeEvent(this,'webkitAnimationEnd',function(){});
			
			this.style.webkitAnimation = "" + unflipName + " " + unflipTime;
			
			var index = (this.id).substr(6);
			this.style.backgroundImage = "url(./images/poker"+table[index].type1+".png)";
			var position = table[index].number;
			this.style.backgroundPosition = poker_[position];
			/*
			removeEvent(this,'webkitAnimationEnd',function(){
				this.style.webkitAnimation = "" + flipName + " " + flipTime;
			});
		});*/
		addEvent(element, 'webkitAnimationEnd',open2 );
	}
}

function open2(event){
	var element = event.target;
	if(!element){  
        return;  
    }
	if(element.style.webkitAnimationName=="open1"){
		var aName = "unflip";
		var aTime = '0.4s';
		var index = (element.id).substr(6);
		element.style.backgroundImage = "url(./images/poker"+table[index].type1+".png)";
		var position = table[index].number;
		element.style.backgroundPosition = poker_[position];
		element.style.webkitAnimation = "" + aName + " " + aTime;
	}
}
function hide2(event){
	var element = event.target;
	if(!element){  
        return;  
    }
	if(element.style.webkitAnimationName=="hide1"){
		var aName = "unflip";
		var aTime = '0.4s';
		element.style.backgroundImage = "url(./images/poker"+poker_b+".png)";
		element.style.backgroundPosition = poker_[0];
		element.style.webkitAnimation = "" + aName + " " + aTime;
	}else if(element.style.webkitAnimationName=="unflip"){
		//翻至背面后再恢复点击事件
		element.onclick = open1;
	}
}

function hideALL(){
	if(is_sound==1){
		var sound1 = document.getElementById("sound1");
		sound1.play();
	}
	var aName = 'hide1';
	var aTime = '0.3s';
	for(var itmp=0; itmp<table.length; itmp++){
		var element = document.getElementById("poker_"+itmp);
		element.style.webkitAnimation = "" + aName + " " + aTime;
		//hide1("poker_"+itmp);
		/*addEvent( element, 'webkitAnimationEnd', function() {
			//removeEvent(this,'webkitAnimationEnd',function(){});
			//this.style.webkitAnimation = "";
			this.style.backgroundPosition = poker_[0];
			this.style.backgroundImage = "url(./images/poker"+poker_b+".png)";
			
		});*/
		addEvent(element, 'webkitAnimationEnd',hide2 );
	}
	//0.5秒后绑定按钮
	var timeout = setTimeout(startGame,500);
}

//不同分钟的指针
var minColor = new Array("#5de034","#509c12","#bfe622","#e29a10","#f78e39","#f40f0a");

function countTime(){
	
	game_time++;
	//指针颜色一分钟换一次
	var color = minColor[Math.floor(game_time/60) % minColor.length];

	var end = clock_start + Math.PI *2 /60 *(game_time%60);
	if(game_time%60 == 0){
		end = clock_start + Math.PI *2 ;
		color = minColor[Math.floor((game_time-1)/60) % minColor.length];
	}

	drawTime(color,clock_start,end);
	
}

function startGame(){
	
	//重置表面
	ready2start(-1);
	//开始计时
	clock_int = self.setInterval(countTime,1000);
	
	
	//绑定按钮事件
	for(var itmp=0; itmp<table.length; itmp++){
			document.getElementById("poker_"+itmp).onclick = open1;	
	}
}

function open1(event){
	if(is_sound==1){
		var sound1 = document.getElementById("sound1");
		sound1.play();
	}
	var element = event.target;
	if(!element){  
        return;  
    }
	
	if(element.style.backgroundPosition != poker_[0] ){
		fliped.length = 0;
		hide1(element.id);
		return ;
	}
	/*if( element.style.webkitAnimationName == "hide1" ){
		return ;
	}*/
	var aName = 'open1';
	var aTime = '0.3s';
	element.style.webkitAnimation = "" + aName + " " + aTime;
	//判断是否相同 延时700
	var timeout = setTimeout(doGame,700,element);
}

// function flip(event) {
	// /*if (!event) {
		// var event = window.event;//获得当前事件(IE)
	// }
	// if (event.target) {//IE没有target
		// */targ = event.target;
	// /*} else if (event.srcElement) {//适用于IE
		// targ = event.srcElement;
	// }*/
	// var flipName = 'flip';
	// //var unflipName = 'flip';
	// var flipTime = '0.4s';
	// //var unflipTime = '0.5s';
	
	  // //flip($("#welcomeStr1")[0], 'flip', '1.5s', 'unflip', '0.7s');  
	// element = targ;
    // if(!element){  
        // return;  
    // }
	// /*
	// removeEvent(element,'webkitAnimationEnd',function(){
				// //this.style.webkitAnimation = "" + flipName + " " + flipTime;
				// this.style.webkitAnimation = "" + unflipName + " " + unflipTime;
			
			// var index = (this.id).substr(6);
			// this.style.backgroundImage = "url(./images/poker"+table[index].type1+".png)";
			// var position = table[index].number;
			// this.style.backgroundPosition = poker_[position];
	// });
	// */
	// //test
    // //alert(element.id);
	// element.style.webkitAnimation = "" + flipName + " " + flipTime;  
	// element.value = 0;
    // addEvent( element, 'webkitAnimationEnd', function() {
		// var index = (this.id).substr(6);
		// this.style.backgroundImage = "url(./images/poker"+table[index].type1+".png)";
		// var position = table[index].number;
		// this.style.backgroundPosition = poker_[position];
		// //removeEvent(this,'webkitAnimationEnd',function(){});
		// //处理已经翻开的
		// //alert(this.style.webkitAnimationName);
		// this.value ++;
		// //alert(this.value);
		// if(this.value==2){
			// this.value = 0;
			// if(fliped.length>0){
				// doGame(this);
			// }else{
				// fliped.push(this);
			// }
		// }
	// });
// }

function doGame(element1){
	//alert("abcd");
	if(fliped.length==0){
		fliped.push(element1);
		return ;
	}
	
	var element2 = fliped.pop();
	if(element1.id==element2.id){
		//fliped.push(element1);
		//hide1(element1.id);
		fliped.length = 0;
		return ;
	}	
	var index1 = (element1.id).substr(6);
	var index2 = (element2.id).substr(6);
	if(table[index1].number ==table[index2].number ){
		if(table[index1].number == poker_point[0] ){
			poker_point.shift();
			if(poker_point.length==0){ //游戏结束
				self.clearInterval(clock_int);
				ready2start(-1);
				//alert("游戏结束！用时"+game_time+"秒");
				gameOver();
			}
			disappear(element1.id);
			disappear(element2.id);
			
			return;
		}
	}
	hide1(element1.id);
	hide1(element2.id);
	
}

function restart(){
	window.location.reload();
}

function  exit(){
	window.location.href = "index.html";
}

function musicSwitch(){
	var element = document.getElementById("side_music");
	if(is_sound==1){
		element.style.backgroundPosition = "-267px 0";
		is_sound = 0;
	}else{
		element.style.backgroundPosition = "-187px 0";
		is_sound = 1;
	}
}

function hideMenu(){
	var aName ="hidemenu" ;
	var aTime = "0.3s";
	var aFun = "ease-out";
	var element = document.getElementById("sidemenu");
	element.style.webkitAnimation = "" + aName + " " + aTime +" "+ aFun;
	addEvent(element, 'webkitAnimationEnd',function(){
		if(this.style.webkitAnimationName == "hidemenu"){
			element.style.width = "27px";
		}
	} );
}

function sideMenu(){
	var aName ="sidemenu" ;
	var aTime = "0.3s";
	var aFun = "ease-out";
	var element = document.getElementById("sidemenu");
	element.style.webkitAnimation = "" + aName + " " + aTime +" "+ aFun;
	addEvent(element, 'webkitAnimationEnd',function(){
		if(this.style.webkitAnimationName == "sidemenu"){
			element.style.width = "447px";
		}
	} );
}

function gameOver(){
	document.getElementById("middle").style.display = "block";
	var over_e = document.getElementById("gameover");
	var diff = "";
	switch (table.length){
		case 24:
		    diff = "困难";break;
		case 16:
			 diff = "中等";break;
		case 8:
		    diff = "容易";break;
	}
	document.getElementById("over_diff").innerHTML = "难度：&nbsp;&nbsp;"+diff;
	document.getElementById("over_time").innerHTML = "用时：&nbsp;&nbsp;"+game_time+"秒";
	var aName ="gameover" ;
	var aTime = "0.5s";
	var aFun = "ease-out";
	if(poker_b<3){
		over_e.style.background = "-webkit-gradient(linear,left top, left bottom, color-stop(0, #CE3C58), color-stop(0.5, #ff96ac),color-stop(1, #CE3C58))";
	}
	over_e.style.webkitAnimation = "" + aName + " " + aTime +" "+ aFun;
	over_e.style.display = "block";
}

function hide1(id){
	if(is_sound==1){
		var sound1 = document.getElementById("sound1");
		sound1.play();
	}
	var element = document.getElementById(id);
	//准备翻转解除点击事件的绑定
	element.onclick = "";
	//removeEvent(element,"click",open1);
	var aName = 'hide1';
	var aTime = '0.3s';
	element.style.webkitAnimation = "" + aName + " " + aTime;
	
}

function disappear(id){
	var disappearName = "disappear";
	var disappearTime = "0.5s";
	var element = document.getElementById(id);
	element.style.webkitAnimation = "" + disappearName + " " + disappearTime;
	
	
	return addEvent( element, 'webkitAnimationEnd', function() {
        document.getElementById(id).style.display = "none";
    });
}

//乱序算法From网络
function arrayShuffle(arr){
	//test
	//alert(table[0].type1);
	var result = new Array();
	var len = arr.length;  
	var tmp;
	while(len--){
		//result[result.length] = arr.splice(Math.floor(Math.random()*(len+1)),1); 
		tmp = Math.floor(Math.random()*(len+1));
		result.push(arr[tmp]);  
		arr.splice(tmp,1);
    }
	
   return result;
  
}

function addEvent( obj, evt, fn ) {
    if ( typeof obj.attachEvent != 'undefined' ) {
        // 为 IE 浏览器添加事件绑定
        obj.attachEvent( "on" + evt, fn );
    } else if ( typeof obj.addEventListener != 'undefined' ) {
        // 兼容 W3C 的事件绑定
        obj.addEventListener( evt, fn, false );
    } else {
        // 你用的浏览器都老掉牙了，换一个吧！
		alert("你用的浏览器都老掉牙了，换一个吧！");
    }
}

function removeEvent(obj,evt,fn) {
 if (obj.removeEventListener != 'undefined' )
  obj.removeEventListener(evt,fn,false);
 else if (obj.detachEvent != 'undefined')
  obj.detachEvent('on'+evt,fn);
}