require 'logger'

class UsersController < ApplicationController

  # render new.rhtml
  def new
    @user = User.new
  end
 
  def create
    logout_keeping_session!
    @user = User.new(:login => params[:email], :password => params[:password], :email => params[:email],
                     :password_confirmation => params[:password])
    success = @user && @user.save
    logger.info @user.errors
    if success && @user.errors.empty?
            # Protects against session fixation attacks, causes request forgery
      # protection if visitor resubmits an earlier form using back
      # button. Uncomment if you understand the tradeoffs.
      # reset session
      self.current_user = @user # !! now logged in
      render 'page/index'
    else
      flash.now[:error]  = "We couldn't set up that account, sorry.  Please try again, or contact an admin (link is above)."
      render 'start/home'
    end
  end

end
