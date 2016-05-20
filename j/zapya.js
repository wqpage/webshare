(function($){
	//提示框
	$.fn.getProcess = function(_switch,_options,_callback) {
		$("#processing .processing-foot").hide()
		$("#processing .commit").hide();
		$("#processing .cancel").hide();
		if(_switch=="show"){
			if(_options){
				_options.p_text==undefined?_options.p_text="处理中，请稍后...":null;
				_options.p_commit==undefined?_options.p_commit="确认":null;
				_options.p_cancel==undefined?_options.p_cancel="取消":null;
				typeof _options.p_fn_commit == "function" || typeof _options.p_fn_cancel == "function"?$("#processing .processing-foot").show():null;
				typeof _options.p_fn_commit == "function"?$("#processing .commit").show():null;
				typeof _options.p_fn_commit == "function"?$("#processing .commit").unbind("click").bind("click",_options.p_fn_commit):null;
				typeof _options.p_fn_cancel == "function"?$("#processing .cancel").show():null;
				typeof _options.p_fn_cancel == "function"?$("#processing .cancel").unbind("click").bind("click",_options.p_fn_cancel):null;
				
			}else{
				_options=new Object();
			};
			$("#processing").attr("class","uk-animation-fade");
			$("#processing").show();
			$("#processing").css("left",(document.body.clientWidth-$("#processing").width())/2);
			$("#processing").css("top",(document.body.clientHeight-$("#processing").height())/2);
			$("#processing .processing-body .processing-text").html(_options.p_text);
			$("#processing .processing-foot .commit").html(_options.p_commit);
			$("#processing .processing-foot .cancel").html(_options.p_cancel);
		}else{
			$("#processing").attr("class","uk-animation-fade uk-animation-reverse");
			setTimeout(function(){$("#processing").hide();},500);
		}
		if(typeof _callback == "function"){
			_callback();
		}
	};
})(jQuery);
if(zapya==undefined||zapya==null){
	var zapya={};
}
zapya.cookie={
	getCookie:function(c_name){
		var document_cookie=document.cookie;
		if (document_cookie.length>0){
			c_start=document_cookie.indexOf(c_name + "=")
			if (c_start!=-1){ 
				　　c_start=c_start + c_name.length+1;
				　　c_end=document_cookie.indexOf(";",c_start);
				　　if (c_end==-1) {
						c_end=document_cookie.length
					}　　
				　　return unescape(document_cookie.substring(c_start,c_end));
			　　} 
		}
		return "";
	},
	setCookie:function(c_name, value, expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/";
	}
},
zapya.samewifi=zapya.cookie.getCookie("zapya_webshare_samewifi")=="false"?false:true;
zapya.cid="cid"+zapya.cookie.getCookie("zapya_webshare_cid");
zapya.relayIp=zapya.cookie.getCookie("relayIp");
zapya.relayPort=zapya.cookie.getCookie("relayPort");
zapya.deviceType=zapya.cookie.getCookie("deviceType");
zapya.socketIp="";
zapya.socketPort="";
zapya.heartbeat=0;
zapya.version="";
zapya.language="cn";
zapya.utils={
	dataFormateInit:function(){
		Date.prototype.Format = function (fmt) { //author: meizz 
			var o = {
		        "M+": this.getMonth() + 1, //月份 
		        "d+": this.getDate(), //日 
		        "h+": this.getHours(), //小时 
		        "m+": this.getMinutes(), //分 
		        "s+": this.getSeconds(), //秒 
		        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		        "S": this.getMilliseconds() //毫秒 
		    };
		    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		    for (var k in o)
		    	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		    return fmt;
		}
	},
	//文件大小格式转换
	sizeFormate:function(size){
		if(size){
			ksize=size/1024;
			if(ksize>100){
				msize=ksize/1024;
				return msize.toFixed(2)+"MB";
			}else{
				return ksize.toFixed(2)+"KB";
			}
		}
		return "0B";
	},
	toTimeByLong: function(msd) {
		var time = parseFloat(msd) / 1000;
		if (null != time && "" != time) {
			if (time > 60 && time < 60 * 60) {
				time = zapya.utils.toTen(parseInt(time / 60.0)) + ":" + zapya.utils.toTen(parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60));
			} else if (time >= 60 * 60 && time < 60 * 60 * 24) {
				time = zapya.utils.toTen(parseInt(time / 3600.0)) + ":" + zapya.utils.toTen(parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) + ":" + zapya.utils.toTen(parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) - parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60));
			} else {
				time = "00:" + zapya.utils.toTen(parseInt(time));
			}
		}
		return time;
	},
	toTen: function(msd) {
		if (parseInt(msd) < 10) {
			return "0" + msd;
		}
		return msd;
	},
	drawImage:function(ImgD,width,height){
		var image=new Image();
   		var iwidth = width; //定义允许图片宽度
    	var iheight = height; //定义允许图片高度
    	image.src=ImgD.src;
    	if(image.width>0 && image.height>0)
    	{
    		if(image.width/image.height>= iwidth/iheight)
    		{
    			if(image.width>iwidth)
    			{
    				ImgD.width=iwidth;
    				ImgD.height=(image.height*iwidth)/image.width;
    			}
    			else
    			{
    				ImgD.width=image.width;
    				ImgD.height=image.height;
    			}
    		}
    		else
    		{
    			if(image.height>iheight)
    			{
    				ImgD.height=iheight;
    				ImgD.width=(image.width*iheight)/image.height;
    			}
    			else
    			{
    				ImgD.width=image.width;
    				ImgD.height=image.height;
    			}
    		} 
    	}
    },
    formatTimestamp:function(timeStamp){
    	if(timeStamp!=undefined&&timeStamp!=null){
    		var date = new Date(timeStamp);
    		Y = date.getFullYear() + '-';
    		M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    		D = (date.getDate()<10?'0'+date.getDate():date.getDate()) + ' ';
    		h = (date.getHours()<10?'0'+date.getHours():date.getHours()) + ':';
    		m = (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()) + ':';
    		s = (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()); 
    		return Y+M+D+h+m+s;  
    	}else{
    		return "error:timesta is undefined or null.";
    	}
    },
},

//获取连接心态
zapya.connectionState={
	linkSocket:null,
	//判断连接方式
	getConnectionBySocket:function(os,lang){
		var url="";
		if(os == "Android"){
			lang=="cn"?url="http://web.kuaiya.cn":url="http://web.izapya.com";
		}else if(os == "Tizen"){
			url="about:blank";
		};
		if(window.WebSocket) {
			var socketUrl="";
			if(zapya.samewifi){//同一wifi下
				if(zapya.socketIp != "" && zapya.socketPort != ""){
					socketUrl="ws://"+zapya.socketIp+":"+zapya.socketPort+""+"/v1/mobiles/linkstate";
					zapya.connectionState.setLinkstateSocket(os,lang,socketUrl);
				}else{
					$.ajax({
						type:"get",
						url:"/v1/mobiles/websocketserver",
						success:function(socketResult){
							zapya.socketIp=socketResult.ip;
							zapya.socketPort=socketResult.port;
							socketUrl="ws://"+zapya.socketIp+":"+zapya.socketPort+""+"/v1/mobiles/linkstate";
							zapya.connectionState.setLinkstateSocket(os,lang,socketUrl);
							socketResult=null;
						}
					})
				}
			}else{//不同wifi下
				socketUrl="ws://"+zapya.relayIp+":"+zapya.relayPort+"/relayws/"+zapya.cid+"/v1/mobiles/linkstate";
				zapya.connectionState.setLinkstateSocket(os,lang,socketUrl);
			}
			
		}else{
			//浏览器版本较低，无法使用拖拽上传
			$("#dropupload_back_div").hide();
			$("#home_fileicon").hide();
		    //无法使用websocket
		    if (!!window.ActiveXObject || "ActiveXObject" in window) {
		    }else{
		    	zapya.connectionState.getConnection("Android",lang);
		    }
		}
	},
	//使用websocket
	setLinkstateSocket:function(os,lang,connectonSocketUrl){
		zapya.connectionState.linkSocket=new WebSocket(connectonSocketUrl);
		zapya.connectionState.linkSocket.onmessage=function(event){
			if(event.data == "close"){
				//断开连接
				zapya.connectionState.linkStopDo(os,lang);
			}
		};
		zapya.connectionState.linkSocket.onclose=function(){
			zapya.connectionState.getConnection(os,lang);
		};
		zapya.connectionState.linkSocket.onerror=function(){
			zapya.connectionState.getConnection(os,lang);
		}
	},
	//断开连接后做的操作
	linkStopDo:function(os,lang){
		var url="";
		if(os == "Android" || os == "iOS"){
			if(lang == "cn"){
				url="http://web.kuaiya.cn";
			}else{
				url="http://web.izapya.com";
			}
		}else if(type == "Tizen"){
			url=window.location.href;
		}
		$.fn.getProcess("show",
		{ 
			p_text:zapya.langPkg.setContent("device_2"),
			p_icon:"",
			p_commit:zapya.langPkg.setContent("common_17"),
			p_fn_commit:function(){
				if(zapya.samewifi){
					location.reload()
				}else{
					window.location.href=url;
				}
			},
		});
	},
	//非websocket方式获取心跳状态
	getConnection:function(os,lang){
		$.ajax({
			type:"get",
			url:zapya.samewifi?"/v1/mobiles/linkstate":"/relay/"+zapya.cid+"/v1/mobiles/linkstate",
			timeout:30000,
			success: function(data,textStatus) {
				if(data=="408"){
					zapya.heartbeat=0;
					zapya.connectionState.getConnection(os,lang);
					//销毁对象data
					data=null;
				}else if(data=="401"){
					zapya.connectionState.linkStopDo(os,lang);
					data=null;
				}
			},
			error:function(jqXHR,textStatus,errorThrown){
				if(zapya.samewifi){
					setTimeout(function(){
						if(zapya.heartbeat>=4){
							zapya.connectionState.linkStopDo(os,lang);
						}else{
							zapya.connectionState.getConnection(os,lang);
							zapya.heartbeat+=1;
						};
					},1500);
				}else{
					setTimeout(function(){
						if(zapya.heartbeat>=6){
							zapya.connectionState.linkStopDo(os,lang);
						}else{
							zapya.connectionState.getConnection(os,lang);
							zapya.heartbeat+=1;
						};
					},1500);
				}
			},
			complete:function(XHR, TS){
				XHR = null;
			}
		});
	}
},
//监控数据更新socket
zapya.updateState={
	updateSocket:null,
	getUpdateSocket:function(){
		if(window.WebSocket) {
			var socketUrl="";
			if(zapya.samewifi){//同一wifi下
				if(zapya.socketIp != "" && zapya.socketPort != ""){
					socketUrl="ws://"+zapya.socketIp+":"+zapya.socketPort+""+"/v1/mobiles/linkstate";
					zapya.updateState.setUpdateSocket(socketUrl);
				}else{
					$.ajax({
						type:"get",
						url:"/v1/mobiles/websocketserver",
						success:function(socketResult){
							zapya.socketIp=socketResult.ip;
							zapya.socketPort=socketResult.port;
							socketUrl="ws://"+zapya.socketIp+":"+zapya.socketPort+""+"/v1/mobiles/linkstate";
							zapya.updateState.setUpdateSocket(socketUrl);
							socketResult=null;
						}
					})
				}
			}else{//不同wifi下
				socketUrl="ws://"+zapya.relayIp+":"+zapya.relayPort+"/relayws/"+zapya.cid+"/v1/mobiles/linkstate";
				zapya.updateState.setUpdateSocket(socketUrl);
			}
		}
	},
	setUpdateSocket:function(socketUrl){
		zapya.updateState.updateSocket=new WebSocket(updateSocketUrl);
		zapya.updateState.updateSocket.onmessage =function(event){
			var updateData=event.data;
			if(zapya.deviceType == "pc"){
				if(updateData == "image"){
					zapya.images.init();
				}else if(updateData == "audio"){
					zapya.audio.init();
				}else if(updateData == "video"){
					zapya.video.init();
				}else if(updateData == "app"){
					zapya.app.init();
				}
			}else if(zapya.deviceType == "phone"){
				if(updateData == "image"){
					zapya.images.init();
				}
			}
		};
	}

},

//获取连接手机的信息
zapya.getPhoneInfo=function(){
	$.ajax({
		url:zapya.samewifi?"/v1/mobiles/infos":"/relay/"+zapya.cid+"/v1/mobiles/infos",
		type:"get",
		success:function(data){
			var model = data.model,
			version = data.version,
			language=data.language,
			supportnotification=data.supportnotification;
			if(language == 0){//简体
				zapya.language="cn";
			}else if(language == 1){//英文
				zapya.language="en";
			}else if(language == 2){//繁体
				zapya.language="fa";
			}
			zapya.langPkg.init(zapya.language);
			if(zapya.deviceType == "pc"){
				if(version.indexOf("Android") > -1){
					zapya.connectionState.getConnectionBySocket("Android",language);
				}
			}else if(zapya.deviceType == "phone"){
				//处理storage
				var html=[];
				for(var i=0;i<data.storage.length;i++){
					var process=(parseFloat(data.storage[i].current)/parseFloat(data.storage[i].total))*100;
					var processBg="#fabf4c";
					if(process<50){
						processBg="#89c061";
					}else if(process>80){
						processBg="#ee6359";
					}
					var borderRadius=process<98?"border-radius:10px 0 0 10px":"border-radius:10px 9px 9px 10px";
					html.push("<div class='m_item uk-width-1-1'>");
					html.push("      <div class='m_name'>"+data.storage[i].name+"</div>");
					html.push("      <div class='m_info'>"+zapya.langPkg.setContent("device_0")+data.storage[i].current+"GB/"+zapya.langPkg.setContent("device_1")+""+data.storage[i].total+"GB</div>");
					html.push("      <div class='m_process'>");
					html.push("          <div class='m_process_bar' style='height:100%;width:"+(process>2?process:2)+"%;background:"+processBg+";"+borderRadius+";'></div>");
					html.push("      </div>");
					html.push("</div>");
				}
			$(".d_info .t_module").text(model);
			$(".d_info .t_system").text(version);
			$(".home_panel .d_memery").empty();
			$(".home_panel .d_memery").append(html.join(""));
				if(version.indexOf("Android") > -1){//Android系统
					zapya.version="Android";
					zapya.connectionState.getConnectionBySocket("Android",language);
					zapya.updateState.getUpdateSocket();
					zapya.app_phone.init();
					zapya.file_phone.init();
					}else if(version.indexOf("Tizen") > -1){//tizen系统
						zapya.version="Tizen";
						//判断当前浏览器,若是IE,则不执行getConnection
						if (!!window.ActiveXObject || "ActiveXObject" in window) {
							
						}else  {
							zapya.connectionState.getConnection("Tizen",language);
						}
						zapya.app_phone.init();
						zapya.file_phone.init();
						
					}else if(version.indexOf("iOS") > -1){
						zapya.version="iOS";
						//判断当前浏览器,若是IE,则不执行getConnection
						if (!!window.ActiveXObject || "ActiveXObject" in window) {
							
						}else  {
							zapya.connectionState.getConnection("iOS",language);
						}
						$("#app_category_li").hide();
						$("#file_category_li").hide();
					}
					zapya.images.init();
					zapya.video_phone.init();
					zapya.audio_phone.init();
					zapya.camera_phone.init();
				}				
		},
		complete:function(XHR, TS){
			XHR = null;
		}
	})
}
