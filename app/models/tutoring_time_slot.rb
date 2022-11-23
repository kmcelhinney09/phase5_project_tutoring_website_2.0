class TutoringTimeSlot < ApplicationRecord
  has_many :booked_slots
  belongs_to :room
end
