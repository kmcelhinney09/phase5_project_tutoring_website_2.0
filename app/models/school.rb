class School < ApplicationRecord
  has_many :users
  has_many :buildings
  has_many :tutoring_time_slots
end
