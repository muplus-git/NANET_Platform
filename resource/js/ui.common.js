$(function(){
    datePicker();
    popupFunc();
    animateFunc();
    familySite();
    mobilemenuFunc();
    gnbMymenu();
    asideMenu();
})

$(window).load(function(){
    introFunc();
})

function datePicker(){
    // datepicker
	$(".datepicker").datepicker({
		showOn: "both", // 버튼과 텍스트 필드 모두 캘린더를 보여준다.
		buttonImage: "../../resource/images/icons/ico_calender.png", // 버튼 이미지.
		dateFormat: "yy-mm-dd", // 텍스트 필드에 입력되는 날짜 형식.
		changeMonth: true ,
		changeYear: true,
		nextText: '다음 달', // next 아이콘의 툴팁.
		prevText: '이전 달', // prev 아이콘의 툴팁.		
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토']
	});
}

// 팝업오픈
function popupFunc(e) {
    var layerPop = $("#" + e);
    popClose = $(".popup_bg, .pop_close");

    layerPop.addClass("active");

    popClose.on("click", function () {
        $(this).parents(layerPop).removeClass("active"); /* 2022-09-01 수정 */ 
    });
}


// 탭 메뉴
function tabMenu(e, cont) {

    var tabMenu = null,
        tabMenuList = null,
        tabCont = null,
        tabContShow = null;

    function tabMenuFunc(e) {
        tabMenu = $(e);
        tabMenuList = tabMenu.find('li a');
        tabCont = $(cont).children();
        tabContShow = $(cont).children('.active');

        tabCont.hide();
        tabContShow.show();

        tabMenuList.on('click', function () {
            tabMenuList.parent('li').removeClass('on');
            $(this).parent('li').addClass('on');
            tabCont.hide();
            var activeTabs = $(this).parent('li').attr('rel');
            $('#' + activeTabs).stop().fadeIn();
            $(".nano").nanoScroller();
        });
    }

    tabMenuFunc(e);
}


var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#header_wrap').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('#header_wrap').removeClass('nav-down').addClass('nav-up');
        $('.user_menu').removeClass('on');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('#header_wrap').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}

function animateFunc() {
    var e = $(".animate");

    e.scrolla({
        mobile: true,
        once: true,
        animateCssVersion: 3,
    });
}

function familySite(){
    $('.footer_site button').on('click',function(){
        $(this).next('ul').toggleClass('on');
    });
}

// 모바일 메뉴
function mobilemenuFunc(){
    $('.btn_m_menu').on('click',function(){
        $('.lnb_dim').toggleClass('on');
        $('.header_lnb').toggleClass('on');
        $('body,html').toggleClass('lnb_open');
    });
    $('.header_lnb .lnb_close,.lnb_dim').on('click',function(){
        $('.lnb_dim').removeClass('on');
        $('.header_lnb').removeClass('on');
        $('body,html').removeClass('lnb_open');
    });
}
// 마이 메뉴
function gnbMymenu(){
    $('.user.login').on('click',function(){
        $('.user_menu').toggleClass('on');
    });
}

function introFunc(){
    $('.main_visual_bg').addClass('on');
    $('.visual_search').addClass('on');
}

function asideMenu(){
    $('.menu_list li.active').addClass('on').children('ul').show();
    $(".menu_list li.has-sub>a").click(function(){

        var element = $(this).parent('li');
        element.toggleClass("on");
        element.children("ul").slideToggle(200);
    });

}