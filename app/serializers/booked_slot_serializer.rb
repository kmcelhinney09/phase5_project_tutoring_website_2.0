class BookedSlotSerializer < ActiveModel::Serializer
  attributes :id, :date, :start_time, :end_time, :location
  
  def date
    date = object.tutoring_time_slot.start_time.strftime("%A, %b %d")
  end
  def start_time
    start_time = object.tutoring_time_slot.start_time.strftime(" %l %M %p")
  end
  def end_time
    end_time = object.tutoring_time_slot.end_time.strftime(" %l %M %p")
  end

  def location
    time_slot = object.tutoring_time_slot
    room = time_slot.room
    building = room.building
   location = building.name + " - " +room.name
  end
end
