
puts "Create Notes"
  TutorNote.create!(tutor_id:4, tutee_id:1, note:Faker::Movies::StarWars.quote)
  TutorNote.create!(tutor_id:4, tutee_id:2, note:Faker::Movies::StarWars.quote)
  TutorNote.create!(tutor_id:4, tutee_id:3, note:Faker::Movies::StarWars.quote)
  TutorNote.create!(tutor_id:5, tutee_id:1, note:Faker::Movies::StarWars.quote)
  TutorNote.create!(tutor_id:5, tutee_id:2, note:Faker::Movies::StarWars.quote)
  TutorNote.create!(tutor_id:5, tutee_id:3, note:Faker::Movies::StarWars.quote)
