OFMFS.Page = {
    init:function(){
	if (this.edit) this.setupEdit();
	OFMFS.Player.init();
    },

    setupEdit:function(){
	this.connectUploadButton();
	this.connectSocialButtons();
	this.setupTooltips();
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
	this.uploadButton.css({'left':window.innerWidth * .5, 'top':window.innerHeight * .5});
	$('div#upload-tooltip').css({'left':window.innerWidth * .5, 'top':window.innerHeight * .5});
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
