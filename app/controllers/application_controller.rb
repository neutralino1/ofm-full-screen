require 'authenticated_system'
class ApplicationController < ActionController::Base
  include AuthenticatedSystem
  protect_from_forgery

  def search
    @tracks = OfmFullScreen.ofm.tracks(params[:q])
    render 'search/search', :layout => false
  end

  protected

  def setup_for_pages
    @pages = current_user.pages
  end
end
