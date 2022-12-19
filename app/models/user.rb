class User < ApplicationRecord
  has_secure_password
  before_save {self.email = email.downcase}
  enum role: [:tutee, :tutor, :admin]

  belongs_to :school
  has_many :booked_slots, foreign_key: 'tutee_id', dependent: :destroy
  has_many :booked_as_tutor, class_name: 'BookedSlot', foreign_key: 'tutor_id'
  has_many :tutored_subjects, class_name: 'TutoredSubject', foreign_key: 'tutor_id', dependent: :destroy
  has_many :subjects_signed_up, :through => :tutored_subjects, :source => 'subject'
  has_many :tutor_sign_ups, class_name: "TutorSlotSignUp", foreign_key: 'tutor_id', dependent: :destroy
  has_many :tutor_notes, class_name: "TutorNote", foreign_key:'tutor_id', dependent: :destroy
  has_many :tutee_notes, class_name: "TutorNote", foreign_key:'tutee_id', dependent: :destroy

  #Password validation from chowderhead found on DEV.to here: https://dev.to/nodefiend/rails-password-validation-29kj
  validate :password_lower_case
  validate :password_uppercase
  validate :password_special_char
  validate :password_contains_number
  validates :password, length: {minimum:6, maximum:20}
  validates :email, uniqueness: true
  validates :full_name, :email, :time_zone, presence: true

  after_initialize do
    if self.new_record?
      self.role ||= :tutee
    end
  end

  def password_uppercase
    return if !!password.match(/\p{Upper}/)
    errors.add :password, ' must contain at least 1 uppercase '
  end

  def password_lower_case
    return if !!password.match(/\p{Lower}/)
    errors.add :password, ' must contain at least 1 lowercase '
  end

  def password_special_char
    special = "?<>',?[]}{=-)(*&^%$#`~{}!"
    regex = /[#{special.gsub(/./){|char| "\\#{char}"}}]/
    return if password =~ regex
    errors.add :password, ' must contain special character'
  end

  def password_contains_number
    return if password.count("0-9") > 0
    errors.add :password, ' must contain at least one number'
  end

  def notes_from_tutor
    notes = TutorNote.where(tutee_id:self.id).to_a
    tutor_notes_arry = notes.map{|note| {id:note.id, tutor_name:note.tutor.full_name, tutor_note:note.note}}
  end

  def notes_belong_to_tutor
    notes = TutorNote.where(tutor_id:self.id).to_a
    tutor_notes_arry = notes.map{|note| {id:note.id, tutor_name:note.tutor.full_name, tutor_note:note.note}}
  end
end
