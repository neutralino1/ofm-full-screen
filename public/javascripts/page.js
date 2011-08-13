OFMFS.Page = {
    init:function(){
	this.title = $('div#title');
	if (this.edit) this.setupEdit();
	OFMFS.Player.init();
    },

    setupEdit:function(){
	this.overlay = $('div#overlay');
	this.titleTooltips = $('div.title-tooltips');
	this.connectUploadButton();
	this.connectSocialButtons();
	this.setupTooltips();
	this.setupDraggable();
	this.setupFontModal();
//	this.setupFontSelect();
//	this.loadFont();
    },

    setupFontModal:function(){
	this.fontModal = $('div#font-modal');
	$('a#title-font-link').click(this.showFontModal.bind(this));
	$('a#artist-font-link').click(this.showFontModal.bind(this));
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
