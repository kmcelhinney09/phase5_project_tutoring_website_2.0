puts "Adding Tutor Slot Signups"
  
  slot = 1
  15.times do
    TutorSlotSignUp.create!(tutor_id:4, tutoring_time_slot_id:slot)
    slot = slot + 1
  end

  slot = 2
  15.times do
    TutorSlotSignUp.create!(tutor_id:5, tutoring_time_slot_id:slot)
    slot = slot + 1
  end

  
  slot = 17
  15.times do
    TutorSlotSignUp.create!(tutor_id:10, tutoring_time_slot_id:slot)
    slot = slot + 1
  end

  slot = 18
  15.times do
    TutorSlotSignUp.create!(tutor_id:11, tutoring_time_slot_id:slot)
    slot = slot + 1
  end
