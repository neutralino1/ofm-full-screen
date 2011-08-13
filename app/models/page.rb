require 'logger'
require 'fileutils'

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

  FONTS = ['Comfortaa', 'Wallpoet', 'Special Elite', 'Zeyada', 'Bowlby One SC', 'Bangers',
          'Orbitron', 'Lobster', 'Covered By Your Grace']

  attr_accessor :token

  before_save :clear_defaults, :strip_slash
  after_save :rename_image

  def rename_image
    FileUtils.mv("public/backgrounds/#{token}.jpg", "public/backgrounds/#{id}.jpg")
  end

  def clear_defaults
    DEFAULT.each do |k,v|
      self[k] = nil if self[k] == v
    end
  end

  def set_defaults
    return unless new_record?
    DEFAULT.each do |k, v|
      self[k] = v
    end
  end

  def strip_slash
    self.custom = self.custom[1..-1] if self.custom && self.custom[0] == '/'
  end

  def track
    @track = @track || OfmFullScreen.ofm.track(track_id)
  end

  def url
    path = custom ? custom : "pages/#{id}"
    "http://electric-samurai-728.heroku.com/#{path}"
  end

  def twitter_link
    "http://twitter.com/#{twitter[1..-1]}"
  end

  def facebook_url
    return facebook if facebook
    url
  end

  def title_font_or_default
    title_font || 'Istok Web'
  end

end
