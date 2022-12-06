class TutoredSubject < ApplicationRecord
  belongs_to :subject, dependent: :destroy
  belongs_to :tutor, class_name:"User"
end
