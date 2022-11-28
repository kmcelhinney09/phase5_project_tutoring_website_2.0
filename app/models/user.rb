class User < ApplicationRecord
  has_secure_password
  enum role: [:tutee, :tutor, :admin]

  belongs_to :school
  has_many :booked_slots, foreign_key: 'tutee_id'
  has_many :booked_as_tutor, class_name: 'BookedSlot', foreign_key: 'tutor_id'
  has_many :tutored_subjects, class_name: 'TutoredSubject', foreign_key: 'tutor_id'
  has_many :subjects_signed_up, :through => :tutored_subjects, :source => 'subject'

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
