class SchoolSerializer < ActiveModel::Serializer
  attributes :id, :name, :locations, :tutoring_time_slots
  has_many :tutoring_time_slots

  def locations
    buildings= object.buildings
    rooms = buildings.map{|building| {building:building,rooms:building.rooms}}
  end

end
