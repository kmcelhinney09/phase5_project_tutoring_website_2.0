puts "Creating Booked Time Slots"
  slot = 1  
  10.times do
    BookedSlot.create!(tutor_id:4, tutee_id:[1,2,3].sample, tutoring_time_slot_id:slot, tutor_slot_sign_up_id:slot)
    slot = slot + 1
  end
  slot = 2  
  10.times do
    BookedSlot.create!(tutor_id:5, tutee_id:[1,2,3].sample, tutoring_time_slot_id:slot, tutor_slot_sign_up_id:slot)
    slot = slot + 1
  end