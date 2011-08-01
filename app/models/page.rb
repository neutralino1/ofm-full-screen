require 'logger'

class Page < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :track_id

  DEFAULT = {
    :facebook => 'http://www.facebook.com/',
    :twitter => '@',
    :myspace => 'http://www.myspace.com/',
    :custom => '/',
    :website => 'http://www.'
  }

  after_initialize :set_defaults
  before_save :clear_defaults, :strip_slash

  def clear_defaults
    DEFAULT.each do |k,v|
      self[k] = nil if self[k] == v
    end
    logger.info self.inspect
  end

  def set_defaults
    return unless new_record?
    DEFAULT.each do |k, v|
      self[k] = v
    end
  end

  def strip_slash
    self.custom = self.custom[1..-1] if self.custom[0] == '/'
  end

  def track
    @track = @track || OfmFullScreen.ofm.track(track_id)
  end

  def url
    path = custom ? custom : "pages/#{id}"
    "http://ofm-fs.heroku.com/#{path}"
  end
end
