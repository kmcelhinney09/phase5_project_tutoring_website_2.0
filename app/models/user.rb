class User < ApplicationRecord
  has_secure_password
  enum role: [:tutee, :tutor, :admin]

  belongs_to :school
  
  has_many :booked_slots, foreign_key: 'tutee_id'
    # May not need these plus they mess up the deployment because not all users have booked_tutors/tutees
  # has_many :booked_tutors, class_name: 'BookedSlot', foreign_key: 'tutor_id'
  # has_many :booked_tutees, class_name: 'BookedSlot', foreign_key: 'tutee_id'

  after_initialize do
    if self.new_record?
      self.role ||= :tutee
    end
  end
end
