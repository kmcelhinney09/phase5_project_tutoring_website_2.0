class BookedSlot < ApplicationRecord
  validates :tutor_id, :tutee_id, :tutoring_time_slot_id, :tutor_slot_sign_up_id, presence: true
  
  belongs_to :tutoring_time_slot
  belongs_to :tutor_slot_sign_up

  def tutor
    tutor = User.find(tutor_id)
    subjects = []
    tutor.subjects_signed_up.each do |sub|
      subjects.push(sub.name)
    end
    {id:tutor.id, full_name:tutor.full_name, subjects_covered:subjects * ", "}
  end

  def tutee
    tutee = User.find(self.tutee_id)
    {id:tutee.id, full_name:tutee.full_name}
  end
end
