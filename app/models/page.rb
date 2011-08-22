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
  after_create :rename_image

  def rename_image
    FileUtils.mv("public/backgrounds/#{token}.jpg", "public/backgrounds/#{id}.jpg")
  end

  def clear_defaults
    DEFAULT.each do |k,v|
      self[k] = nil if self[k] == v
    end
    [self.artist_font, self.title_font, self.artist_colour, self.title_colour].each do |it| 
      it = nil if it.blank?
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

  def artist_font_or_default
    artist_font || 'Istok Web'
  end

  def title_color_or_default
    title_colour || '#ffffff'
  end

  def artist_color_or_default
    artist_colour || '#ffffff'
  end

  def title_size_or_default
    title_size || '50'
  end

  def artist_size_or_default
    artist_size || '30'
  end

  def default_custom
    return custom if custom
    title = track.title
    title.gsub!(/([^a-zA-Z0-9]+)/,'')
    n = -1
    until !Page.find_by_custom(title + (n > 0 ? n.to_s : ''))
      n += 1
    end
    title + n.to_s
  end
  
end
