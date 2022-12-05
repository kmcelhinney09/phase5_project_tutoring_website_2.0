class School < ApplicationRecord
  has_many :users, dependent: :destroy
  has_many :buildings, dependent: :destroy
  has_many :tutoring_time_slots, dependent: :destroy
end
