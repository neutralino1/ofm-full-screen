class PagesController < ApplicationController

  before_filter :login_required, :only => [:index, :new]
  def index
    @pages = current_user.pages
  end

  def new
    render :text => "Creating page from #{params[:track_id]}"
  end

end
