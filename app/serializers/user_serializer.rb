class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :school_id, :grade, :role
end
