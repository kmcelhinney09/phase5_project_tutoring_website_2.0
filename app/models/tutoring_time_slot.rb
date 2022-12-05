class TutoringTimeSlot < ApplicationRecord
  has_many :booked_slots, dependent: :destroy
  belongs_to :room
  belongs_to :school
  has_many :tutor_slot_sign_ups, dependent: :destroy
  has_many :tutors, through: :tutor_slot_sign_ups

  def num_of_tutees
    booked = self.booked_slots
    tutee_list = booked.map(&:tutee_id)
    num_tutee = tutee_list.uniq.count
  end

  def num_tutors
    signed_up = self.tutor_slot_sign_ups
    tutor_list = signed_up.map(&:tutor_id)
    num_tutors = tutor_list.uniq.count
  end
  
  def booked_status_update
    num_tutee = self.num_of_tutees
    tutee_capacity = self.tutee_capacity
    if num_tutee >= tutee_capacity
      self.booked_status = true
    else
      self.booked_status = false
    end
  end

  def open_status_update
    if self.num_tutors > 0
      self.open_status = true
    else
      self.open_status = false
    end
  end

  def tutee_space
    booked_slots = self.booked_slots
    open_tutee_slots = self.tutee_capacity - self.num_of_tutees
  end

end
