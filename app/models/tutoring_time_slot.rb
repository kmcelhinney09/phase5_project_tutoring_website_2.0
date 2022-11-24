class TutoringTimeSlot < ApplicationRecord
  has_many :booked_slots
  belongs_to :room
  belongs_to :school

  def num_of_tutees
    booked = self.booked_slots
    tutee_list = booked.map(&:tutee_id)
    num_tutee = tutee_list.uniq.count
  end
  
  def booked_update
    num_tutee = self.num_of_tutees
    tutee_capacity = self.tutee_capacity
    if num_tutee >= tutee_capacity
      self.booked_status = true
    else
      self.booked_status = false
    end
  end

  def num_tutors
    signed_up = self.tutor_slot_sign_ups
    tutor_list = signed_up.map(&:tutor_id)
    num_tutors = tutor_list.uniq.count
  end

  def tutee_space
    booked_slots = self.booked_slots
    open_tutee_slots = self.tutee_capacity - self.num_of_tutees
  end
end
