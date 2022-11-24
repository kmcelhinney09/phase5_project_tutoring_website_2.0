class TutorSlotSignUp < ApplicationRecord
  belongs_to :tutoring_time_slot
  belongs_to :tutor, class_name:"User"
end
