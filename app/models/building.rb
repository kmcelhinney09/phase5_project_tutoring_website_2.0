class Building < ApplicationRecord
  validates :name, :school_id, presence: true
  validates :name, uniqueness: { case_sensitive: false }
  belongs_to :school
  has_many :rooms
end
