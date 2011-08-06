class PicturesController < ApplicationController
  def upload
    @token = Picture.save(params[:picture])
    render 'pages/upload', :layout => false
  end

  def upload_form
    render 'pages/upload_form', :layout => false
  end
end
