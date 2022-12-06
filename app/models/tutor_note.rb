class TutorNote < ApplicationRecord
  validates :tutor_id, :tutee_id, presence: true
  belongs_to :tutor, class_name:"User"
  belongs_to :tutee, class_name:"User"
end
