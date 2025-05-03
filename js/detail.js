$(function(){
	slideDetailMv();
	onCattag();
	setAddCommaInit()
});

/* --------------------------------------------------

slideDetailMv

-------------------------------------------------- */
function slideDetailMv(){
	var $detailSlider = $('#detail_slider');
	var $slider = $detailSlider.find('.slider ul');
	var $thumbnail = $detailSlider.find('.thumbnail');

	$slider.on('init', function (slick, currentSlide, i) {
		$thumbnail.find('li').eq(0).addClass('js-current');
	});
	$slider.on('beforeChange', function (slick, currentSlide, i) {
		var _num = (currentSlide['currentSlide']);
		
		$detailSlider.addClass('anim');
	});
	$slider.on('afterChange', function (slick, currentSlide, i) {
		var _num = (currentSlide['currentSlide']);

		$thumbnail.find('li').removeClass('js-current');
		$thumbnail.find('li').eq(_num).addClass('js-current');
		$detailSlider.removeClass('anim');
	});

	$thumbnail.find('ul li a').on('click', function(i){
		var index = $thumbnail.find('ul li a').index(this);

		$thumbnail.find('ul li').removeClass('js-current');
		$(this).parent('li').addClass('js-current');
		$slider.slick('slickGoTo', index);
	});

	$slider.slick({
		autoplay: true,
		autoplaySpeed: 5000,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					touchMove: true
				}
			}
		]
	});
}


/* --------------------------------------------------

onCattag

-------------------------------------------------- */
function onCattag(){
	var $tag = $('.detail_block .detail_main .main_info .cat_tag ul li a');
	var $wrap = $tag.closest('li');

	$(document).on('click',function(e) {
		var $target = $(e.target).closest('.detail_block .detail_main .main_info .cat_tag ul li a');
		var $targetWarp = $target.closest('li');

		if(!$target.length){
			$wrap.removeClass('is-active');
		}else{
			if($targetWarp.hasClass('is-active')){
				$wrap.removeClass('is-active');
			}else{
				$wrap.removeClass('is-active');
				$targetWarp.addClass('is-active');
			}
		}
	});
}

/* --------------------------------------------------

addComma

-------------------------------------------------- */
function addComma(target){
	var num = target.text();
	var s = String(num).split('.');
	var ret = String(s[0]).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
	if (s.length > 1) {
			ret += '.' + s[1];
	}
	target.html(ret)
}
function setAddCommaInit(){
	$('#container').find('.add_comma').each(function () {
		addComma($(this));
	});
	$('#container').find('.detail_main .main_info .prd_price .prd_price_tax dd .price , .detail_main .main_info .prd_price .prd_price_takeout dd .price , .detail_main .main_info .prd_price .prd_price_eatin dd .price').each(function () {
		addComma($(this));
	});
}