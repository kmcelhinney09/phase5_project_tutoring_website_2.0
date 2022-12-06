puts "Creating Subjects"
  20.times do
    Subject.create!(name:Faker::Educator.subject, school_id:1)
  end