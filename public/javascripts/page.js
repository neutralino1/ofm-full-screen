OFMFS.Page = {
    init:function(){
	this.setupUploadButton();
	OFMFS.Player.init();
    },

    setupUploadButton:function(){
	this.uploadButton = $('input#upload');
	    this.uploadButton.click(function(){
	    $('iframe#upload_target').contents().find('input#picture_file').trigger('click');
	});
	this.uploadButton.css({'left':window.innerWidth * .5, 'top':window.innerHeight * .5});
    },

    showBackground:function(data){
	$('body').css('background-image',"url('/backgrounds/"+data+".jpg')");
    },
};

$(document).ready(function(){
    OFMFS.Page.init();
});
