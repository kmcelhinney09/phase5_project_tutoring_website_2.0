class SchoolSerializer < ActiveModel::Serializer
  attributes :id, :name, :buildings, :rooms
  has_many :users
  has_many :buildings
  has_many :tutoring_time_slots

  def rooms
    buildings= object.buildings
    rooms = buildings.map{|building| building.rooms}
  end
end
