class Room < ApplicationRecord
  validate :name, :buiilding_id, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  belongs_to :building
  has_many :tutoring_time_slots, dependent: :destroy
  has_many :booked_slots, through: :tutoring_time_slots, dependent: :destroy
  
end
