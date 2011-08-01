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
  before_save :clear_defaults

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

end
