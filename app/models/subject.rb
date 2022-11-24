class Subject < ApplicationRecord
  has_many :tutored_subjects
  belongs_to :tutor, class_name:"User"
end
