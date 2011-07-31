class Page < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :track_id
end
