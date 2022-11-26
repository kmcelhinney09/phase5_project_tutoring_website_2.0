puts "Creating Booked Time Slots"
  slot = 1  
  15.times do
    BookedSlot.create!(tutor_id:4, tutee_id:[1,2,3].sample, tutoring_time_slot_id:slot)
    slot = slot + 1
  end
  slot = 2  
  15.times do
    BookedSlot.create!(tutor_id:5, tutee_id:[1,2,3].sample, tutoring_time_slot_id:slot)
    slot = slot + 1
  end

  slot = 17  
  15.times do
    BookedSlot.create!(tutor_id:10, tutee_id:[7,8,9].sample, tutoring_time_slot_id:slot)
    slot = slot + 1
  end
  slot = 17  
  15.times do
    BookedSlot.create!(tutor_id:11, tutee_id:[7,8,9].sample, tutoring_time_slot_id:slot)
    slot = slot + 1
  end