// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var Start = {

    init: function(){
	this.mainContent = $('div#main-content');
	this.logoutLink = $('a#logout');
	this.setupLoginForm();
	this.setupAfterLogin();
    },

    setupLoginForm:function(){
	var loginForm= $('form#login-form');
	var emailField = $('input#email');
	var passField = $('input#password');
	var logInButton = $('input#login');
	var signUpButton = $('input#signup');
	logInButton.click(function(event){
	    $.post('/session', loginForm.serialize(), 
		   function(data){
		       this.mainContent.html(data);
		       this.toggleVisibility(this.logoutLink);
		       this.setupAfterLogin();
		   }.bind(this));
	    event.preventDefault();
	}.bind(this));
	signUpButton.click(function(event){
	    $.post('/users', loginForm.serialize(), 
		   function(data){
		       this.mainContent.html(data);
		   }.bind(this));
	    event.preventDefault();
	}.bind(this));
    },
    
    setupLogoutLink:function(){
	$('a#logout').click(function(event){
	    $.ajax({
		type:'DELETE',
		url:'/session',
		success:function(data){
		    this.toggleVisibility(this.logoutLink);
		    this.toggleLogoutLink();
		    this.mainContent.html(data);
		    this.setupLoginForm();
		}.bind(this)
	    });
	    event.preventDefault();
	}.bind(this));
    },

    setupSearch:function(){
	this.searchResults = $('div#search-results');
	this.searchForm = $('form#ofm-search-form');
	this.spinnerDiv = $('div#search-spinner-div');
	this.searchForm.submit(function(event){
	    this.toggleVisibility(this.spinnerDiv);
	    $.get('/search', this.searchForm.serialize(), function(data){
		this.searchResults.html(data);
		this.setupAfterSearch();
	    }.bind(this));
	    event.preventDefault();
	}.bind(this));
    },

    setupAfterSearch:function(){
	this.toggleVisibility(this.spinnerDiv);
	this.searchToolTip = $('div.help.search-tooltip');
	this.searchToolTip.fadeOut(10000);
	this.searchResults.hover(
	    function(){ this.searchToolTip.fadeIn(1000); }.bind(this),
	    function(){ this.searchToolTip.fadeOut(1000); }.bind(this));
	$('a.button.create-page').click(function(){
	    var track_id = parseInt(this.id);
	    $.get('/pages/new', {'track_id':track_id}, function(data){
		$('div#left-pane').html(data);
		SearchPlayer.init();
	    });
	});
	SearchPlayer.init();
    },

    setupAfterLogin:function(){
	this.setupLogoutLink();
	this.setupSearch();
    },

    toggleVisibility:function(item){
	item.toggleClass('hidden');
    }

};


var SearchPlayer = {
    init:function(){
	this.alreadyInit = false;
	this.playButtons = $('a.button.loading');
	if (!this.player){
	    this.player = OfficialFM.Player.create({
		container_id: "search-player",
		aspect: 'small',
		type: 'track',
		id: parseInt(this.playButtons.first().attr('id')),
		onReady: function() { this.post_init(); }.bind(this),
		onPlay: function(track_id) { this.sync_play_buttons_of_track(track_id); }.bind(this),
		onPause: function() { this.sync_current_track_pause_buttons(); }.bind(this),
		onTracklistEnd: function() { this.reset_played_track_buttons(); }.bind(this)
            });
	}else{
	    this.post_init();
	}
    },

    post_init: function() {
	this.display_play_buttons();
	this.manage_track_plays();
    },

    display_play_buttons: function() {
	this.playButtons.removeClass('loading');
	this.playButtons.addClass('play');
    },

    manage_track_plays: function() {
	if (!this.playButtons || this.alreadyInit) return;
//	this.alreadyInit = true;

	this.playButtons.click(function() {
	    var button_track_id = parseInt(this.id);
	    var current_track_id = SearchPlayer.player.get_current_track_id();
	    if (current_track_id != button_track_id) {
		SearchPlayer.reset_played_track_buttons();
		SearchPlayer.player.play_track(button_track_id);
	    } else {
		SearchPlayer.player.is_playing() ? SearchPlayer.player.pause() : SearchPlayer.player.play_track(button_track_id);
      }
	});
    },

    sync_play_buttons_of_track: function(track_id) {
	$("a." + track_id + "-track").each(function(i, b){
	    this.cleanClass($(b));
	    $(b).addClass("pause");
	    $(b).html("");
	}.bind(this));
    },

    sync_current_track_pause_buttons: function() {
	var track_id = this.player.get_current_track_id();
	$("a." + track_id + "-track").each(function(i, b){
	    this.cleanClass($(b));
	    $(b).addClass("paused");
	    $(b).html("");
	}.bind(this));
    },
    
    reset_played_track_buttons: function() {
	track_id = this.player.get_current_track_id();
	$("a." + track_id + "-track").each(function(i, b){
	    this.cleanClass($(b));
	    $(b).addClass("play");
	    $(b).html("");
	}.bind(this));
  },

    cleanClass: function(el){
	el.removeClass('play');
	el.removeClass('loading');
	el.removeClass('pause');
	el.removeClass('paused');
    }
};


$(document).ready(function(){
    Start.init();
});
