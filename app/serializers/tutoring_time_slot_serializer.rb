class TutoringTimeSlotSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :tutor_capacity, :tutee_capacity, :booked_status, :date, :start_time, :end_time, :school_id, :room_id, :open_status,
  has_many :booked_slots
  belongs_to :school
  belongs_to :room

  def date_sort
    object.date_start_time.to_f()
  end
  
  def date
    date = object.start_time.strftime("%A, %b %d")
  end

  def start_time
    start_time = object.start_time.strftime(" %l %M %p")
  end

  def end_time
    end_time = object.end_time.strftime(" %l %M %p")
  end

end
