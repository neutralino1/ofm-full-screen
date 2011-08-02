require 'lib/authenticated_system.rb'
class ApplicationController < ActionController::Base
  include AuthenticatedSystem
  protect_from_forgery

  def search
    @tracks = OfmFullScreen.ofm.tracks(params[:q])
    raise @tracks.inspect
    render 'search/search', :layout => false
  end

  protected

  def setup_for_pages
    @pages = current_user.pages
  end
end
