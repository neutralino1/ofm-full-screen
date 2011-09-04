require 'digest/sha1'

class Picture < ActiveRecord::Base

  def self.save(upload)
    name =  upload['file'].original_filename
    #directory = "public/backgrounds"
    directory = "#{Rails.root}/tmp"
    # create the file path
    filename = Digest::SHA1.hexdigest(Time.now.to_s)
    path = File.join(directory, "#{filename}.jpg")
    # write the file
    File.open(path, "wb") { |f| f.write(upload['file'].read) }
    return filename
  end
end
