class Picture < ActiveRecord::Base
  def self.save(upload)
    name =  upload['file'].original_filename
    directory = "public/backgrounds"
    # create the file path
    path = File.join(directory, "#{upload[:track_id]}.jpg")
    # write the file
    File.open(path, "wb") { |f| f.write(upload['file'].read) }
  end
end
