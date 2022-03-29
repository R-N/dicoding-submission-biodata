$(function(){
	$(".modal").hide();
	$("#field-umur").text(getAge("1997/08/05") + " Tahun");
	refreshCollapsibles();
	$(".collapsible").click(function(){
		$(this).toggleClass("collapsible-active");
		$(this).parent().toggleClass("collapsible-group-active");
		let content = $(this).next();
		content.toggleClass("collapsible-content-active");
		if(content.hasClass("collapsible-content-active")){
			setTimeout(function(){
				let scrollHeight = content[0].scrollHeight;
				let paddingTop = content.css("padding-top");
				let paddingBottom = content.css("padding-bottom");
				let calc = 
					"calc("
					+ scrollHeight + "px"
					+ " + " + paddingTop
					+ " + " + paddingBottom
					+ ")"
				;
				content.css("max-height", calc);
			});
		}else{
			content.css("max-height", 0);
		}
	});
	$(window).resize(function(){
		refreshCollapsibles();
	});
	$(window).scroll(checkScroll);
});
function checkScroll(){
	let scroll = $(window).scrollTop();

	let scrollButton = $("#scroll-to-top-button");
	if(scroll > $(window).height()){
		if(scrollButton.hasClass("hidden")) scrollButton.removeClass("hidden");
	}else{
		if(!scrollButton.hasClass("hidden")) scrollButton.addClass("hidden");
	}
}

function refreshCollapsibles(){
	$(".collapsible-content").each(function(){
		let content = $(this);
		if(content.hasClass("collapsible-content-active")){
			let scrollHeight = content[0].scrollHeight;
			content.css("max-height", scrollHeight);
		}else{
			content.css("max-height", 0);
		}
	});
}

function showModal(selector, show){
	$(selector).each(function(){
		//$(this).css("display", show ? "block" : "none");
		//$(this).css("opacity", show ? 1 : 0);
		if(show) $(this).hide().fadeIn();
		else $(this).fadeOut();
	});
}

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function scrollToTop(){
  $("html, body").animate({ scrollTop: 0 }, "slow");
}