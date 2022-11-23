class TutoringTimeSlotSerializer < ActiveModel::Serializer
  attributes :id, :created_by, :tutor_capacity, :tutee_capacity, :booked_status, :start_time, :end_time, :school_id, :room_id, :open_status
  has_many :booked_slots
end
