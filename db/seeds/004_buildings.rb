puts "Creating Buildings"
  24.times do
    Building.create!(name:Faker::Educator.campus + " Hall", school_id:rand(1..4))
  end