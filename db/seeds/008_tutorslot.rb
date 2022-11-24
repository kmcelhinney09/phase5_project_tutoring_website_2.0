puts "Adding Tutor Slot Signups"
  20.times do
    TutorSlotSignUp.create!(tutor_id:[2,3,5,6,8,9,11,12].sample, tutoring_time_slot_id:rand(1..40))
  end