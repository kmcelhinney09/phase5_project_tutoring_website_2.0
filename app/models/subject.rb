class Subject < ApplicationRecord
  has_many :tutored_subjects, dependent: :destroy
  belongs_to :school
  
  validates :name, :school_id, presence: true
end
