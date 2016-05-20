var cookie={
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
};
//ajax封装
Ajax = function() {  
	function request(opt) {  
		function fn() {  
		}  
		var url = opt.url || "";  
		var async = opt.async !== false, method = opt.method || 'GET', data = opt.data  
		|| null, success = opt.success || fn, error = opt.failure  
		|| fn;  
		method = method.toUpperCase();  
		if (method == 'GET' && data) {  
			var args = "";  
			if(typeof data == 'string'){  
                //alert("string")  
                args = data;  
            }else if(typeof data == 'object'){  
                //alert("object")  
                var arr = new Array();  
                for(var k in data){  
                	var v = data[k];  
                	arr.push(k + "=" + v);  
                }  
                args = arr.join("&");  
            }  
            url += (url.indexOf('?') == -1 ? '?' : '&') + args;  
            data = null;  
        }  
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest()  
        : new ActiveXObject('Microsoft.XMLHTTP');  
        xhr.onreadystatechange = function() {  
        	_onStateChange(xhr, success, error);  
        };  
        xhr.open(method, url, async);  
        if (method == 'POST') {  
        	xhr.setRequestHeader('Content-type',  
        		'application/x-www-form-urlencoded;');  
        }  
        xhr.send(data);  
        return xhr;  
    }  
    function _onStateChange(xhr, success, failure) {  
    	if (xhr.readyState == 4) {  
    		var s = xhr.status;  
    		if (s >= 200 && s < 300) {  
    			success(xhr);  
    		} else {  
    			failure(xhr);  
    		}  
    	} else {  
    	}  
    }  
    return {  
    	request : request  
    };  
}();  
var verify=false;
function getOS(){
	var useragent=navigator.userAgent;
	if(useragent.indexOf("Windows NT 6.3")>-1){
		return "Windows_8.1";
	}else if(useragent.indexOf("Windows NT 10.0")>-1){
		return "Windows_10";
	}else if(useragent.indexOf("Windows NT 6.2")>-1){
		return "Windows_8";
	}else if(useragent.indexOf("Windows NT 6.1")>-1){
		return "Windows_7";
	}else if(useragent.indexOf("Windows NT 6.0")>-1){
		return "Windows_Vista";
	}else if(useragent.indexOf("Windows NT 5.2")>-1){
		return "Windows_XP";
	}else if(useragent.indexOf("Windows NT 5.1")>-1){
		return "Windows_XP";
	}else if(useragent.indexOf("Windows NT 5.01")>-1){
		return "Windows_2000";
	}else if(useragent.indexOf("Windows NT 5.0")>-1){
		return "Windows_2000";
	}else if(useragent.indexOf("Mac OS X")>-1){
		return "Mac_OS_X";
	}else if(useragent.indexOf("Linux")>-1){
		return "Linux";
	}
}
function getLinktype(samewifi,cid){
	var textDiv=document.getElementById("text");
	Ajax.request({
		method:"get",
		url:samewifi?"/v1/mobiles/linktype":"/relay/"+cid+"/v1/mobiles/linktype",
		success:function(data){
			data=eval("(" + data.response + ")");
			if(data.type=="0"){
				textDiv.innerText=zapya.langPkg.setContent("verify_4");
			}else if(data.type=="1"){
				textDiv.innerText=zapya.langPkg.setContent("verify_5");
			}
		},
		error:function(jqXHR,textStatus,errorThrown){
		},
		complete:function(XHR, TS){
			XHR = null;
		}
	});
}
//判断是否为PC端 如果为移动设备 直接跳转
function ispc(){
	var userAgentInfo = navigator.userAgent;
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
	for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {//匹配到移动设备
        	return false;
        }
    }
    return true;
}
window.onload=function(){
	if(!ispc()){
		var content=document.getElementById("content");
		content.style.marginTop=((document.body.clientHeight-500)/2)+'px';
	}
	var samewifi=cookie.getCookie("zapya_webshare_samewifi")=="false"?false:true;
	var cid="cid"+cookie.getCookie("zapya_webshare_cid");
	Ajax.request({
		method:"get",
		url:samewifi?"/v1/mobiles/infos":"/relay/"+cid+"/v1/mobiles/infos",
		success: function(data){
			data=eval("(" + data.response + ")");
			var model=data.model,
			language=data.language;
			var preUrl="";
			if(language == 0){
				zapya.language="cn";
				preUrl="http://web.kuaiya.cn"
			}else if(language == 1){
				zapya.language="en";
				preUrl="http://web.izapya.com"
			}else if(language == 2){
				zapya.language="fa";
				preUrl="http://web.izapya.com"
			}
			document.getElementById("module").innerText=zapya.langPkg.setContent("verify_3")+" "+model;
			var backButton=document.getElementById("back-button");
			backButton.innerText=zapya.langPkg.setContent("verify_1");
			backButton.addEventListener("click",function(){
				window.location.href=preUrl;
			},false);
			backButton.style.display="block";
			var ispc_show=ispc();
			var isphone=0;
			if(ispc_show){
				isphone=0;
			}else{
				isphone=1;
			}
			var requestip=window.location.hostname;
			Ajax.request({
				method:"get",
				url:samewifi?"/v1/mobiles/verify":"/relay/"+cid+"/v1/mobiles/verify",
				data:{requestip:requestip,isphone:isphone,t:new Date().getTime(),os:getOS(),imgpreheight:document.body.clientHeight-80,imgprewidth:document.body.clientWidth-150},
				success: function(data){
					if(data.status=="200"){
						data=null;
						verify=true;
						if(ispc_show){
							cookie.setCookie("deviceType","pc");
							backButton.style.display="none";
							window.location.href=samewifi?"/index.html":"/relay/"+cid+"/index.html";
						}else{
							cookie.setCookie("deviceType","phone");
							backButton.style.display="none";
							window.location.href=samewifi?"/index_phone.html":"/relay/"+cid+"/index_phone.html";
						}
						
					}
				},
				error:function(jqXHR,textStatus,errorThrown){
				},
				complete:function(XHR, TS){
					XHR = null;
				}
			});
			getLinktype(samewifi,cid);
		},
		error:function(jqXHR,textStatus,errorThrown){
		},
		complete:function(XHR, TS){
			XHR = null;
		}
	});
};