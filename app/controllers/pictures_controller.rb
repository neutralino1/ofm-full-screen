class PicturesController < ApplicationController
  def upload
    post = Picture.save(params[:picture])
    @track_id = params[:picture][:track_id]
    render 'pages/upload', :layout => false
  end

  def upload_form
    @track_id = params[:track_id]
    render 'pages/upload_form', :layout => false
  end
end
