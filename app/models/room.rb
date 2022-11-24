class Room < ApplicationRecord
  belongs_to :building
  has_many :tutoring_time_slots
  has_many :booked_slots, through: :tutoring_time_slots
end
