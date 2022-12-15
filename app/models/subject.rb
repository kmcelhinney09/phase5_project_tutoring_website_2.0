class Subject < ApplicationRecord
  has_many :tutored_subjects, dependent: :destroy
  has_many :tutors, through: :tutored_subjects, foreign_key: :tutor_id
  belongs_to :school
  
  validates :name, :school_id, presence: true
end
