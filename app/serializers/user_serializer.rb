class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :grade, :role, :tutor_notes
  belongs_to :school
  has_many :booked_slots, foreign_key: 'tutee_id'

  def tutor_notes
    notes = object.notes_from_tutor
  end
end
