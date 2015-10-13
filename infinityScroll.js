var infinitiScroll = {
	urlPrefix: "http://the.url.prefix/", 
	urlSuffix: "/the_suffix", 
	contentElement: "#content", 
	contentWrapper: ".contentWrapper", 
	pageNavigation: ".navigation"
};

const NAVIGATION_OFFSET = 100;

var nextPage = 2;
var loadingPage = false;

function infinitiScroll() {
	if(!loadingPage) {
		loadingPage = true;
		$.get(infinitiScroll.urlPrefix + nextPage + infinitiScroll.urlSuffix, function(data){
			$(data).find(infinitiScroll.contentElement).find(infinitiScroll.contentWrapper).appendTo(infinitiScroll.contentWrapper);
		}).done(function(){
			nextPage++;
			loadingPage = false;
		}).fail(function(){
			$(infinitiScroll.pageNavigation).css({display: 'none'});
		});
	}	
}

$(document).ready(function(){
	$(infinitiScroll.pageNavigation + " a").click(function(){
		infinitiScroll();
		return false;
	})
});

$(window).scroll(function(){
	var positionNav = $(infinitiScroll.pageNavigation).offset().top;
	var top = $(document).scrollTop();
	var windowHeight = $(window).height();
	if(top + windowHeight > positionNav - NAVIGATION_OFFSET) {
		infinitiScroll();
	}
});