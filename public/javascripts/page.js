OFMFS.Page = {
    init:function(){
	this.title = $('div#title');
	if (this.edit) this.setupEdit();
	OFMFS.Player.init();
    },

    setupEdit:function(){
	this.overlay = $('div#overlay');
	this.titleTooltips = $('div.title-tooltips');
	this.trackTitle = $('h1#track-title');
	this.artistName = $('h2#artist-name');
	this.connectUploadButton();
	this.connectSocialButtons();
	this.setupTooltips();
	this.setupDraggable();
	this.setupFontModal();
	this.setupColorPicker();
	this.setupSizeSelect();
    },

    setupSizeSelect:function(){
	$('select#page_title_size').change(this.setFontSize.bind(this));
	$('select#page_artist_size').change(this.setFontSize.bind(this));
    },

    setFontSize:function(event){
	sel = $(event.target);
	if (/title/.test(sel.attr('id'))) this.trackTitle.css('font-size', sel.val() +'px');
	if (/artist/.test(sel.attr('id'))) this.artistName.css('font-size', sel.val() +'px');
    },
    
    setupColorPicker:function(){
	$('div#title-color-picker').ColorPicker({
	    flat:true,
	    onShow: function (colpkr) {
		$(colpkr).fadeIn(500);
		this.titleTooltips.removeClass('faded');
		return false;
	    }.bind(this),
	    onHide: function (colpkr) {
		$(colpkr).fadeOut(500);
		this.titleTooltips.removeClass('faded');
		return false;
	    }.bind(this),
	    onChange: function (hsb, hex, rgb) {
		$('div#title-color-preview').css('backgroundColor', '#' + hex);
		this.trackTitle.css('color', '#' + hex);
		$('input#page_title_colour').val('#' + hex);
	    }.bind(this)
	});
	$('div#title-color-preview').click(function(){
	    $('div#title-color-picker').toggleClass('hidden');
	});
	$('div#artist-color-picker').ColorPicker({
	    flat:true,
	    onShow: function (colpkr) {
		$(colpkr).fadeIn(500);
		this.titleTooltips.removeClass('faded');
		return false;
	    }.bind(this),
	    onHide: function (colpkr) {
		$(colpkr).fadeOut(500);
		this.titleTooltips.removeClass('faded');
		return false;
	    }.bind(this),
	    onChange: function (hsb, hex, rgb) {
		$('div#artist-color-preview').css('backgroundColor', '#' + hex);
		this.artistName.css('color', '#' + hex);
		$('input#page_artist_colour').val('#' + hex);
	    }.bind(this)
	});
	$('div#artist-color-preview').click(function(){
	    $('div#artist-color-picker').toggleClass('hidden');
	});
    },

    setupFontModal:function(){
	this.fontModal = $('div#font-modal');
	$('img#title-font-link').click(this.showFontModal.bind(this));
	$('img#artist-font-link').click(this.showFontModal.bind(this));
	$('div#font-modal td').click(this.setFont.bind(this));
	$('a#cancel-font').click(this.hideFontModal.bind(this));
    },

    setFont:function(event){
	this.hideFontModal();
	var font = $(event.target).attr('data');
	$('input#page_'+this.fontTarget+'_font').val(font);
	if (this.fontTarget == 'title')
	    $('h1#track-title').css({'font-family': font, 'font-weight' : 'normal'});
	if (this.fontTarget == 'artist')
	    $('h2#artist-name').css({'font-family': font, 'font-weight' : 'normal'});
    },

    hideFontModal:function(){
	this.overlay.hide();
	this.fontModal.hide();
	this.titleTooltips.removeClass('faded');
    },
    
    showFontModal:function(event){
	id = event.target.id;
	if(/title/.test(id)) this.fontTarget = 'title';
	if(/artist/.test(id)) this.fontTarget = 'artist';
	this.overlay.show();
	this.centerOnScreen(this.fontModal);
	this.fontModal.show();
	var items = $('div#font-modal td');
	var fonts = $.map(items, function(e){
	    return $(e).attr('data');
	});
	WebFontConfig = {
            google: { families: fonts }
	};
	this.loadFonts();
	items.each(function(){
	    $(this).css({'font-family': $(this).attr('data')})
	});
    },

    loadFonts:function(){
	var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	    '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
    },

    centerOnScreen:function(element){
	var x = (window.innerWidth - element.width()) * .5;
	var y = (window.innerHeight - element.height()) * .5;
	element.css({'left':x, 'top':y});
    },
    
    setupDraggable:function(){
	this.title.draggable(event,{
	    stop:function(){
		this.titleTooltips.removeClass('faded');
		var pos = this.title.position();
		$('input#page_title_x').val(pos.left);
		$('input#page_title_y').val(pos.top);
	    }.bind(this)
	});
	this.title.bind('mousedown', function(){
	    this.titleTooltips.addClass('faded');
	}.bind(this));
	this.titleTooltips.bind('mousedown', function(e){e.stopPropagation();});
    },

    setupTooltips:function(){
	this.firsts = $('.first');
	this.seconds = $('.second');
	this.seconds.hide();
	this.firsts.show();
    },
    
    connectUploadButton:function(){
	this.uploadButton = $('input#upload');
	    this.uploadButton.click(function(){
	    $('iframe#upload_target').contents().find('input#picture_file').trigger('click');
	});
	this.centerOnScreen(this.uploadButton);
	this.centerOnScreen($('div#upload-tooltip'));
    },

    connectSocialButtons:function(){
	this.connectField('facebook', /^(http|https):\/\/www.facebook.com\/.+/);
	this.connectField('twitter', /@.+/);
	this.connectField('website', /^(http|https):\/\/[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(([0-9]{1,5})?\/.*)?$/);
	this.connectField('myspace', /http:\/\/www.myspace.com\/.+/);
    },
    
    connectField:function(id, regexp){
	$('input#page_'+id).bind('keyup', function(event){
	    if(regexp.test($(event.target).val()))
		$('a#'+id+'-btn').removeClass('faded');
	    else
		$('a#'+id+'-btn').addClass('faded');
	});
    },
    
    returnFromUpload:function(token){
	$('body').css('background-image',"url('/backgrounds/"+token+".jpg')");
	$('input#page_token').val(token);
	this.uploadButton.addClass('faded');
	this.firsts.fadeOut();
	this.seconds.fadeIn();
    },
};

$(document).ready(function(){
    OFMFS.Page.init();
});
