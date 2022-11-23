class BookedSlot < ApplicationRecord
    # May not need these plus they mess up the deployment because not all users have booked_tutors/tutees
  # belongs_to :booked_tutor, class_name:"User"
  # belongs_to :booked_tutee, class_name:"User"
  belongs_to :tutoring_time_slot
end
