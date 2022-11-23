class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :grade, :role
  belongs_to :school
  has_many :booked_tutors, class_name: 'BookedSlot', foreign_key: 'tutor_id'
  has_many :booked_tutees, class_name: 'BookedSlot', foreign_key: 'tutee_id'
end
