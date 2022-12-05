class TutorSlotSignUp < ApplicationRecord
  belongs_to :tutoring_time_slot
  belongs_to :tutor, class_name:"User"
  has_many :booked_slots, dependent: :destroy
end
