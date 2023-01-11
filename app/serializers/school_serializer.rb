class SchoolSerializer < ActiveModel::Serializer
  attributes :id, :name, :locations, :tutoring_time_slots, :subjects
 
  has_many :tutoring_time_slots
  has_many :subjects

  def locations
    buildings= object.buildings.order(:name)
    locations = buildings.map{|building| {building:building,rooms:building.rooms.order(:name)}}
  end

  def tutoring_time_slots
    object.tutoring_time_slots.order(:start_time)
  end

  def subjects
    object.subjects.order(:name)
  end

end
