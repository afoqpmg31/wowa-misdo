$(function(){
	initCateNav();
});

$(window).on('load', function() {
});

/* --------------------------------------------------

initCateNav

-------------------------------------------------- */
function initCateNav(){
	setCateNav();
	setHeadergNav();
	setCateNavWidth();
	setControlCateNav();
}

function setCateNav(){
	var $navs = $('#head_cate_nav .nav_list').find('li');
	var data_hcate = $('body').attr('data-hcate');

	if(data_hcate !== '' || data_hcate !== undefined){
		$navs.each(function(i,v){
			var date_hcatenav = $(v).attr('data-hcatenav');
			if(date_hcatenav == data_hcate){
				$(v).addClass('is-current');
			}
		});
	}else{
		return false;
	}
}

function setHeadergNav(){
	var $head_gNavs = $('#mdHeader .mdHeader_gNav_list').find('li');
	var actUrl = location.pathname.split("/")[1];
	
	if(actUrl == 'm_menu'){
		$head_gNavs.each(function(i,v){
			if($(v).attr('date-hgnav') == actUrl){
				$(v).addClass("is-active");
			}
		});
	}else{
		return false;
	}
}

function setCateNavWidth(){
	var _winW;
  var _isSp = true;  //PC:false, SP:true
	var _bp = 768;

	function checkSp(){
		_winW = $(window).width();
		(_winW >= _bp) ? _isSp = false : _isSp = true;

		var $nav_list_ul = $('#head_cate_nav .nav_list').find('ul');
	
		if(_isSp){
			$('#head_cate_nav .nav_list').css({
				'width': '999px'
			});
			$('#head_cate_nav .nav_list').css({
				'width': $nav_list_ul.outerWidth(true)
			});
		}else{
			$('#head_cate_nav .nav_list').css({
				'width': 'auto'
			});
		}
	}
	
	$(window).on('load',function(){
    checkSp();
  });

	$(window).on('resize',function(){
		setTimeout(function(){
    	checkSp();
		}, 1000);
  });
}

function setControlCateNav(){
	var $head_cate_nav = $('#head_cate_nav');
	var $nav_block = $head_cate_nav.find('.nav_block');
	var $nav_list = $head_cate_nav.find('.nav_list');
	var $nav_control = $head_cate_nav.find('.nav_control');
	var $control_bnt_left = $nav_control.find('.control_bnt_left');
	var $control_bnt_right = $nav_control.find('.control_bnt_right');
	var _scrollDistance = 240;
	var _scrollLeft;

	$nav_block.scroll(function() {
		_scrollLeft = $nav_block.scrollLeft();

		
		if(_scrollLeft == 0){
			$control_bnt_left.hide();
		}else{
			$control_bnt_left.show();
		}

		if($nav_block.scrollLeft() >= $nav_list.find('ul').width() - $head_cate_nav.width()){
			$control_bnt_right.hide();
		}else{
			$control_bnt_right.show();
		}
	});

	$control_bnt_left.on('click',function(){
		_scrollLeft = $nav_block.scrollLeft();
		$nav_block.animate({
			scrollLeft:_scrollLeft - _scrollDistance
		}, 500, 'swing');
	});

	$control_bnt_right.on('click',function(){
		_scrollLeft = $nav_block.scrollLeft();
		$nav_block.animate({
			scrollLeft:_scrollLeft + _scrollDistance
		}, 500, 'swing');
	});

	$nav_block.trigger('scroll');
}