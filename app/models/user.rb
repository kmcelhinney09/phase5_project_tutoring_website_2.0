class User < ApplicationRecord
  has_secure_password
  enum role: [:tutee, :tutor, :admin]

  belongs_to :school
  
  after_initialize do
    if self.new_record?
      self.role ||= :tutee
    end
  end
end
