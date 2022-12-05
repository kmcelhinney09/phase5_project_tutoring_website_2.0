class User < ApplicationRecord
  has_secure_password
  enum role: [:tutee, :tutor, :admin]

  belongs_to :school
  has_many :booked_slots, foreign_key: 'tutee_id', dependent: :destroy
  has_many :booked_as_tutor, class_name: 'BookedSlot', foreign_key: 'tutor_id', dependent: :destroy
  has_many :tutored_subjects, class_name: 'TutoredSubject', foreign_key: 'tutor_id', dependent: :destroy
  has_many :subjects_signed_up, :through => :tutored_subjects, :source => 'subject'
  has_many :tutor_sign_ups, class_name: "TutorSlotSignUp", foreign_key: 'tutor_id', dependent: :destroy
  has_many :tutor_notes, class_name: "TutorNote", foreign_key:'tutor_id', dependent: :destroy
  has_many :tutee_notes, class_name: "TutorNote", foreign_key:'tutee_id', dependent: :destroy


  after_initialize do
    if self.new_record?
      self.role ||= :tutee
    end
  end

  def notes_from_tutor
    notes = TutorNote.where(tutee_id:self.id).to_a
    tutor_notes_arry = notes.map{|note| {id:note.id, tutor_name:note.tutor.full_name, tutor_note:note.note}}
  end
end
