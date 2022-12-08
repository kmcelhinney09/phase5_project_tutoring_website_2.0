class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :grade, :role, :tutor_notes, :written_notes
  belongs_to :school
  has_many :booked_slots, foreign_key: 'tutee_id'
  has_many :booked_as_tutor, class_name: 'BookedSlot', foreign_key: 'tutor_id'
  has_many :tutor_sign_ups, class_name: "TutorSlotSignUp", foreign_key: 'tutor_id'
  has_many :subjects_signed_up, :through => :tutored_subjects, :source => 'subject'


  def tutor_notes
    notes = object.notes_from_tutor
  end

  def written_notes
    notes = object.notes_belong_to_tutor
  end
end
