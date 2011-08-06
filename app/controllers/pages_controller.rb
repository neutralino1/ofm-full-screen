require 'logger'
class PagesController < ApplicationController

  before_filter :login_required, :only => [:index, :new, :create]
  def index
    @pages = current_user.pages
  end

  def new
    @track = OfmFullScreen.ofm.track(params[:track_id])
    @page = Page.new(:track_id => @track.id)
    render 'new', :layout => false
  end

  def create
    logger.info params[:page].inspect
    page = current_user.pages.build(params[:page])
    if page.save!
      setup_for_pages
      redirect_to page_path(page)
    else
      raise page.errors
    end
  end

  def show
    @page = Page.find_by_id(params[:id])
    @page = Page.find_by_custom(params[:id]) unless @page
    return redirect_to root_path unless @page
    @track = OfmFullScreen.ofm.track(@page.track_id)
    render 'show', :layout => false
  end

  def destroy
    page = Page.find(params[:id])
    page.destroy
    render :text => ''
  end
  
end
