class BookedSlotSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_time, :end_time, :location, :tutor, :tutee, :created_at, :date_sort, :tutor_slot_sign_up_id
  
  def date
    time_slot = object.tutoring_time_slot
    date = time_slot.date_render
  end
  def start_time
    time_slot = object.tutoring_time_slot
    start_time = time_slot.start_time_render
  end
  def end_time
    time_slot = object.tutoring_time_slot
    end_time = time_slot.end_time_render
  end
  def created_at
    created_at = object.created_at.strftime("%A, %b%d -%l:%M %p")
  end

  def date_sort
    time_slot = object.tutoring_time_slot
    date_sort = time_slot.date_sort_render
  end

  def location
    time_slot = object.tutoring_time_slot
    time_slot.location_render
  end

end
