
puts "Creating Users"

User.create!(full_name:"student tutee", email:"tutee@fake.com", school_id:1, grade:'freshman', password:'Abc123!', role:'tutee')

schools = School.all
 schools.each do |school|
  if school.name == "Lincoln Middle School"
    User.create!(full_name: Faker::Name.name, 
      email: Faker::Internet.email, 
      school_id:school.id, 
      grade:'6', 
      password:'Abc123!', 
      role:'tutee')

    User.create!(full_name: Faker::Name.name, 
      email: Faker::Internet.email, 
      school_id:school.id, 
      grade:'8', 
      password:'Abc123!', 
      role:'tutor')

    User.create!(full_name: Faker::Name.name, 
      email: Faker::Internet.email, 
      school_id:school.id, 
      grade:'Admin', 
      password:'Abc123!', 
      role:'admin')

  else
    User.create!(full_name: Faker::Name.name, 
      email: Faker::Internet.email, 
      school_id:school.id, 
      grade:'freshman', 
      password:'Abc123!', 
      role:'tutee')

    User.create!(full_name: Faker::Name.name, 
      email: Faker::Internet.email, 
      school_id:school.id, 
      grade:'senior', 
      password:'Abc123!', 
      role:'tutor')

    User.create!(full_name: Faker::Name.name, 
      email: Faker::Internet.email, 
      school_id:school.id, 
      grade:'Admin', 
      password:'Abc123!', 
      role:'admin')
    end
  end