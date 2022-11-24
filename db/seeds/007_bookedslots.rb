puts "Creating Booked Time Slots"
  20.times do
    BookedSlot.create!(tutor_id:[2,3,5,6,8,9,11,12].sample, tutee_id:[1,4,7,10].sample, tutoring_time_slot_id:rand(1..40))
  end