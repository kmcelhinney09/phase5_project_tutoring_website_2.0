puts 'Creating Tutoring Time Slots'
day = 10
4.times do
start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
TutoringTimeSlot.create!(created_by:6, 
  tutor_capacity:2, 
  tutee_capacity:6, 
  booked_status: false, 
  start_time: start_time, 
  end_time: start_time+2.hours, 
  school_id:1, 
  room_id:1, 
  open_status: false)
  day = day + 1
end

day = 10
4.times do
start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
TutoringTimeSlot.create!(created_by:6, 
  tutor_capacity:2, 
  tutee_capacity:6, 
  booked_status: false, 
  start_time: start_time, 
  end_time: start_time+2.hours, 
  school_id:1, 
  room_id:2, 
  open_status: false)
  day = day + 1
end

day = 12
4.times do
start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
TutoringTimeSlot.create!(created_by:6, 
  tutor_capacity:2, 
  tutee_capacity:6, 
  booked_status: false, 
  start_time: start_time, 
  end_time: start_time+2.hours, 
  school_id:1, 
  room_id:3, 
  open_status: false)
  day = day + 1
end

4.times do
  start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
  TutoringTimeSlot.create!(created_by:6, 
    tutor_capacity:2, 
    tutee_capacity:6, 
    booked_status: false, 
    start_time: start_time, 
    end_time: start_time+2.hours, 
    school_id:1, 
    room_id:4, 
    open_status: false)
    day = day + 1
  end

  day = 10
4.times do
start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
TutoringTimeSlot.create!(created_by:6, 
  tutor_capacity:2, 
  tutee_capacity:6, 
  booked_status: false, 
  start_time: start_time, 
  end_time: start_time+2.hours, 
  school_id:2, 
  room_id:5, 
  open_status: false)
  day = day + 1
end

day = 10
4.times do
start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
TutoringTimeSlot.create!(created_by:6, 
  tutor_capacity:2, 
  tutee_capacity:6, 
  booked_status: false, 
  start_time: start_time, 
  end_time: start_time+2.hours, 
  school_id:2, 
  room_id:6, 
  open_status: false)
  day = day + 1
end

day = 12
4.times do
start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
TutoringTimeSlot.create!(created_by:6, 
  tutor_capacity:2, 
  tutee_capacity:6, 
  booked_status: false, 
  start_time: start_time, 
  end_time: start_time+2.hours, 
  school_id:2, 
  room_id:7, 
  open_status: false)
  day = day + 1
end

4.times do
  start_time = Time.zone.parse("2022-12-#{day} 15:30:00")
  TutoringTimeSlot.create!(created_by:6, 
    tutor_capacity:2, 
    tutee_capacity:6, 
    booked_status: false, 
    start_time: start_time, 
    end_time: start_time+2.hours, 
    school_id:2, 
    room_id:8, 
    open_status: false)
    day = day + 1
  end