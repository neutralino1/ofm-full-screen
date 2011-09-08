
OFMFS.Main = {
    init: function(){
	this.mainContent = $('div#main-content');
	this.logoutLink = $('a#logout');
	this.logoutLink.click(this.logOut.bind(this));
	this.setupPending();
	if (OFMFS.loggedIn) this.showHome();
	else this.showLogin();
    },

    setupPending:function(){
	this.pending = $('div#pending');
	this.pending.css({'width': window.innerWidth, 'height' : window.innerHeight});
	this.pending.find('img').css({'left':window.innerWidth * .5, 'top':window.innerHeight * .5});
    },

    showLogin:function(data){
	if(data) this.mainContent.html(data);
	this.showLogoutLink(false);
        this.setupLoginForm();
	$('input#login').click(this.logIn.bind(this));
	$('input#signup').click(this.signUp.bind(this));
    },

    setupLoginForm:function(){
        this.loginForm = $('form#login-form');
        var defaultEmail = 'your@email.com', 
        defaultPass = 'password',
        emailField = $('form#login-form input#email'),
        passField = $('form#login-form input#password');
        emailField.val(defaultEmail);
        passField.val(defaultPass);
        $.each([{'field':emailField, 'default':defaultEmail}, 
                {'field':passField, 'default':defaultPass}], function(){
                    this['field'].focus(function(event){
                        $('div#login-fail').fadeOut();
                        var field = $(event.target);
                        var val = field.val();
                        if (val == this['default']){
                            field.removeClass('faded');
                            $(event.target).val('');
                        }
                    }.bind(this));
                    this['field'].blur(function(event){
                        var field = $(event.target);
                        var val = field.val();
                        if (val == ''){
                            field.addClass('faded');
                            $(event.target).val(this['default']);
                        }
                    }.bind(this));
                });
    },

    logIn:function(event){
	post(event, '/session', this.loginForm, this.showHome, this);
    },

    showHome:function(data){
        if (data == 'fail'){
            $('div#login-fail').fadeIn();
            return;
        }
	if(data) this.mainContent.html(data);
	this.showLogoutLink();
	this.showSearch();
	this.showPageList();
    },

    signUp:function(event){
	post(event, '/users', this.loginForm, this.showHome, this);
    },

    showLogoutLink:function(show){
	show = (show == null) ? true : show;
	if(show) this.logoutLink.removeClass('hidden');
	else this.logoutLink.addClass('hidden');
    },

    logOut:function(event){
	delet(event, '/session', null, this.showLogin, this);
    },

    showSearch:function(){
	this.searchResults = $('div#search-results');
	this.searchForm = $('form#ofm-search-form');
	this.spinnerDiv = $('div#search-spinner-div');
	this.searchForm.submit(this.search.bind(this));
    },

    search:function(event){
	event.preventDefault();
	this.toggleVisibility(this.spinnerDiv);
	$.get('/search', this.searchForm.serialize(), this.showSearchResults.bind(this));
    },

    showSearchResults:function(data){
	this.toggleVisibility(this.spinnerDiv);
	if (data) this.searchResults.html(data);
	this.searchToolTip = $('div.help.search-tooltip');
	this.searchToolTip.fadeOut(10000);
	this.searchResults.hover(
	    function(){ this.searchToolTip.fadeIn(1000); }.bind(this),
	    function(){ this.searchToolTip.fadeOut(1000); }.bind(this));
//	$('a.button.create-page').click(this.createNewPage);
	OFMFS.Player.init();
    },

    createNewPage:function(event){
	var track_id = parseInt(event.target.id);
	$.get('/pages/new', {'track_id':track_id}, OFMFS.Edit.init);
//	$.get('/pages/new', {'track_id':track_id}, this.setupNewPage);
    },

    setupNewPage:function(data){
	if (data) this.leftPanel.html(data);
	OFMFS.Player.init();
	this.pageForm = $('form#new_page');
	this.pageForm.submit(this.submitNewPage.bind(this));
    },

    submitNewPage:function(event){
	event.preventDefault();
	$.post('/pages', $(event.target).serialize(), this.setupPageList.bind(this));
    },

    showPageList:function(data){
	this.leftPanel = $('div#left-pane');
	if (data) this.leftPanel.html(data);
	OFMFS.Player.init();
	$('div.page-summary').each(function(){
	    $(this).hover(function(){
		$(this).find('div.manage-links').removeClass('hidden');
	    },
		       function(){
			   $(this).find('div.manage-links').addClass('hidden');
		       });
	});
	$('a.page-delete-link').each(function(i, l){
	    $(l).click(this.deletePage.bind(this));
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
		count = $('span#page_count');
		count.html(parseInt(count.html) - 1);
	    }});
    },

    toggleVisibility:function(item){
	item.toggleClass('hidden');
    }

};

$(document).ready(function(){
    OFMFS.Main.init();
});
