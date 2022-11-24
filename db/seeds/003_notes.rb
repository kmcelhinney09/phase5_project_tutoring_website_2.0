
puts "Create Notes"
  20.times do
    TutorNote.create!(tutor_id:[2,3,5,6,8,9,11,12].sample, tutee_id:[1,4,7,10].sample, note:Faker::Movies::StarWars.quote)
  end