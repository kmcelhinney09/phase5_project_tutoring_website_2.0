class SchoolSerializer < ActiveModel::Serializer
  attributes :id, :name, :buildings, :tutoring_time_slots
  has_many :users
  has_many :buildings
  has_many :tutoring_time_slots

  def buildings
    buildings= object.buildings
    rooms = buildings.map{|building| [{building:building,room:building.rooms}]}
  end

end
