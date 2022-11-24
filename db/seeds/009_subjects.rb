puts "Creating Subjects"
  20.times do
    Subject.create!(name:Faker::Educator.subject)
  end