 var webshareModule=angular.module('WebshareModule',[]);
 webshareModule.controller("HomeController",["$scope","$http",function($scope,$http){
 	$("#toggle-nav-i").bind("click",function(){
		$(".nav-title").toggle();
		if($(".nav-title").is(":hidden")){
			$(".sidebar-menu").removeClass("large").addClass("short");
		}else{
			$(".sidebar-menu").removeClass("short").addClass("large");
		}
	});
	$("#logo-env").bind("click",function(){
		$(".home-contents").show();
		$("#all-contents").hide();
		$(".sidebar-menu").hide();
		$("#toggle-nav-i").hide();
	});
	$(".info-menu-icon-container").bind("click",function(){
		var $parentLi=$(this).parent(".info-menu-li");
		if($parentLi.hasClass("open")){
			$parentLi.removeClass("open");
			$parentLi.find(".info-menu-content").hide();
		}else{
			$(".info-menu-li").removeClass("open");
			$(".info-menu-content").hide();
			$parentLi.addClass("open");
			$parentLi.find(".info-menu-content").show();
		}
	});
	zapya.getPhoneInfo();
}])