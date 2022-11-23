class BookedSlot < ApplicationRecord
  belongs_to :booked_tutor, class_name:"User"
  belongs_to :booked_tutee, class_name:"User"
  belongs_to :tutoring_time_slot
end
