class School < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  has_many :users, dependent: :destroy
  has_many :buildings, dependent: :destroy
  has_many :tutoring_time_slots, dependent: :destroy
end
