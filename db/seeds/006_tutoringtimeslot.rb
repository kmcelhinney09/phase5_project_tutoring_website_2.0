puts 'Creating Tutoring Time Slots'
  40.times do
    start_time = DateTime.parse(Faker::Time.forward(23,:afternoon).to_s)
    end_time = start_time+2.hours
    TutoringTimeSlot.create!(created_by:[3,6,9,12].sample, 
      tutor_capacity:2, 
      tutee_capacity:6, 
      booked_status: false, 
      start_time: start_time, 
      end_time: end_time, 
      school_id:rand(1..4), 
      room_id:rand(1..10), 
      open_status: false)
  end