class PagesController < ApplicationController

  before_filter :login_required, :only => [:index, :new]
  def index
    @pages = current_user.pages
  end

  def new
    @track = OfmFullScreen.ofm.track(params[:track_id])
    @page = Page.new
    render 'new', :layout => false
  end

end
