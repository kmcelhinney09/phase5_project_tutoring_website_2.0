class SchoolSerializer < ActiveModel::Serializer
  attributes :id, :name, :locations, :tutoring_time_slots
  has_many :buildings
  has_many :tutoring_time_slots

  def locations
    buildings= object.buildings
    rooms = buildings.map{|building| [{building:building,room:building.rooms}]}
  end

end
