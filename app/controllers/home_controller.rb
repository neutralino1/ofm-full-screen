class HomeController < ApplicationController
  def index
    redirect_to '/pages' if current_user
  end

end
