puts "Adding Tutor Slot Signups"
  
  slot = 2
  4.times do
    TutorSlotSignUp.create!(tutor_id:4, tutoring_time_slot_id:slot)
    slot = slot + 1
  end

  slot = 3
  4.times do
    TutorSlotSignUp.create!(tutor_id:5, tutoring_time_slot_id:slot)
    slot = slot + 1
  end
