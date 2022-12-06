
puts "Creating Users"

User.create!(full_name:"Haily Tutee", email:"tutee1@fake.com", school_id:1, grade:'sophmore', time_zone:'Pacific Time (US & Canada)', password:'Abc123!', role:'tutee')
User.create!(full_name:"Eric Tutee", email:"tutee2@fake.com", school_id:1, grade:'senior', time_zone:'Pacific Time (US & Canada)', password:'Abc123!', role:'tutee')
User.create!(full_name:"Abbygail Tutee", email:"tutee3@fake.com", school_id:1, grade:'freshman', time_zone:'Pacific Time (US & Canada)', password:'Abc123!', role:'tutee')
User.create!(full_name:"Kevin Tutor", email:"tutor1@fake.com", school_id:1, grade:'senior', time_zone:'Pacific Time (US & Canada)', password:'Abc123!', role:'tutor')
User.create!(full_name:"Deniece Tutor", email:"tutor2@fake.com", school_id:1, grade:'senior', time_zone:'Pacific Time (US & Canada)', password:'Abc123!', role:'tutor')
User.create!(full_name:"Kevin Admin", email:"admin@fake.com", school_id:1, grade:'Admin', time_zone:'Pacific Time (US & Canada)', password:'Abc123!', role:'admin')
