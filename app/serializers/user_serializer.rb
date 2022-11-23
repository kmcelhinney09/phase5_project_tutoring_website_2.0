class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :grade, :role
  belongs_to :school
end
