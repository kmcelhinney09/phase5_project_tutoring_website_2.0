class TutoringTimeSlotSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :tutors, :tutee_space, :tutee_capacity, :tutor_capacity, :booked_status, :date, :start_time, :end_time, :room_id, :date_sort, :open_status, :location_render, :date_sort, :tutor_slot_sign_ups  
  has_many :booked_slots
  belongs_to :school
  belongs_to :room

  
  def date_sort
    object.start_time.to_f()
  end
  
  def date
    date = object.start_time.strftime("%A, %b %d")
  end

  def start_time
    start_time = object.start_time.strftime("%l:%M %p")
  end

  def end_time
    end_time = object.end_time.strftime("%l:%M %p")
  end

  
  def tutee_space
    object.tutee_space
  end

  def tutors_count
    tutors = object.tutor_capacity - object.num_tutors
  end
  def tutors
    tutors = object.tutors
    tutor_data = []
    
    tutors.each do |tutor|
      subjects = []
      tutor.subjects_signed_up.each do |sub|
        subjects.push(sub.name)
      end

      tutor_data.push({id:tutor.id, full_name:tutor.full_name, grade:tutor.grade, subjects_covered:subjects * ", "})
    end
    tutor_data
  end

  def location_render
    location = object.location_render
  end

end
