OFMFS.Player = {
    init:function(autoplay){
	this.alreadyInit = false;
	this.playButtons = $('a.button.loading');
	if (!this.player){
	    this.player = OfficialFM.Player.create({
		container_id: "search-player",
		aspect: 'small',
		type: 'track',
		id: parseInt(this.playButtons.first().attr('id')),
		onReady: function() { 
		    this.post_init(); 
		    if (autoplay) this.player.play();
		}.bind(this),
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
	this.alreadyInit = true;

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