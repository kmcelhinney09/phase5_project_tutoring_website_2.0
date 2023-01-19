class TutorSlotSignUpSerializer < ActiveModel::Serializer
  attributes :id, :date,:start_time,:end_time, :date_sort, :tutor, :location
  belongs_to :tutoring_time_slot
  belongs_to :tutor, class_name:"User"

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

  def date_sort
    time_slot = object.tutoring_time_slot
    s = time_slot.date_sort_render
  end

  def location
    time_slot = object.tutoring_time_slot
    time_slot.location_render
  end
end
