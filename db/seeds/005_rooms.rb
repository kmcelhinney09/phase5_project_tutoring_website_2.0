puts "Creating Rooms"
  72.times do
    Room.create!(name:'Room ' + rand(1..500).to_s, building_id:rand(1..24))
  end