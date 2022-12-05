class Subject < ApplicationRecord
  has_many :tutored_subjects, dependent: :destroy
end
