class PagesController < ApplicationController

  before_filter :login_required, :only => [:index, :new, :create]
  def index
    @pages = current_user.pages
  end

  def new
    @track = OfmFullScreen.ofm.track(params[:track_id])
    @page = Page.new(:track_id => @track.id)
    render 'pages/show', :layout => false
  end

  def create
    page = current_user.pages.build(params[:page])
    if page.save!
      setup_for_pages
      render 'index', :layout => false
    else
      raise page.errors
    end
  end

  def destroy
    page = Page.find(params[:id])
    page.destroy
    render :text => ''
  end
  
end
