// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

var OFMFS = {

    init: function(){
	this.mainContent = $('div#main-content');
	this.logoutLink = $('a#logout');
	this.logoutLink.click(this.logOut);
	if (this.loggedIn) this.showHome();
	else this.showLogin();
    },

    showLogin:function(data){
	if(data) this.mainContent.html(data);
	this.showLogoutLink(false);
	this.loginForm = $('form#login-form');
	$('input#login').click(this.logIn);
	$('input#signup').click(this.signUp);
    },

    logIn:function(event){
	event.preventDefault();
	$.post('/session', this.loginForm.serialize(), this.showHome);
    },

    showHome:function(data){
	if(data) this.mainContent.html(data);
	this.showLogoutLink();
	this.showSearch();
	this.showPageList();
    },

    signUp:function(event){
	event.preventDefault();
	$.post('/users', this.loginForm.serialize(), this.showHome);
    },

    showLogoutLink:function(show){
	show = (show == null) ? true : show;
	if(show) this.logoutLink.removeClass('hidden');
	else this.logoutLink.addClass('hidden');
    },

    logOut:function(event){
	event.preventDefault();
	$.ajax({
	    type:'DELETE',
	    url:'/session',
	    success:this.showLogin
	});
    },

    showSearch:function(){
	this.searchResults = $('div#search-results');
	this.searchForm = $('form#ofm-search-form');
	this.spinnerDiv = $('div#search-spinner-div');
	this.searchForm.submit(this.search);
    },

    search:function(event){
	event.preventDefault();
	this.toggleVisibility(this.spinnerDiv);
	$.get('/search', this.searchForm.serialize(), this.showSearchResults);
    },

    showSearchResults:function(data){
	this.toggleVisibility(this.spinnerDiv);
	if (data) this.searchResults.html(data);
	this.searchToolTip = $('div.help.search-tooltip');
	this.searchToolTip.fadeOut(10000);
	this.searchResults.hover(
	    function(){ this.searchToolTip.fadeIn(1000); }.bind(this),
	    function(){ this.searchToolTip.fadeOut(1000); }.bind(this));
	$('a.button.create-page').click(this.createNewPage);
	Player.init();
    },

    createNewPage:function(event){
	var track_id = parseInt(event.target.id);
	$.get('/pages/new', {'track_id':track_id}, this.setupNewPage);
    },

    setupNewPage:function(data){
	if (data) this.leftPanel.html(data);
	Player.init();
	this.pageForm = $('form#new_page');
	this.pageForm.submit(this.submitNewPage);
    },

    submitNewPage:function(event){
	event.preventDefault();
	$.post('/pages', $(event.target).serialize(), this.setupPageList);
    },

    showPageList:function(data){
	this.leftPanel = $('div#left-pane');
	if (data) this.leftPanel.html(data);
	Player.init();
	$('div.page-summary').each(function(){
	    $(this).hover(function(){
		$(this).find('div.manage-links').removeClass('hidden');
	    },
		       function(){
			   $(this).find('div.manage-links').addClass('hidden');
		       });
	});
	$('a.page-delete-link').each(function(i, l){
	    $(l).click(this.deletePage);
	}.bind(this));
    },

    deletePage:function(event){
	event.preventDefault();
	$.ajax({
	    type:'DELETE',
	    url:'/pages/' + parseInt(event.target.id),
	    success:function(){
		$(event.target).closest('div.page-summary').animate({height: 0, opacity: 0}, 'slow', 
								    function(){$(this).remove();});
	    }});
    },

    toggleVisibility:function(item){
	item.toggleClass('hidden');
    }

};


var Player = {
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

	this.playButtons.click(function(event) {
	    var button_track_id = parseInt(event.target.id);
	    var current_track_id = this.player.get_current_track_id();
	    if (current_track_id != button_track_id) {
		this.reset_played_track_buttons();
		this.player.play_track(button_track_id);
	    } else {
		this.player.is_playing() ? this.player.pause() : this.player.play_track(button_track_id);
      }
	}.bind(this));
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
    OFMFS.init();
});
