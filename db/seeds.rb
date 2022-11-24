# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

puts "Clearing Old Data"
School.destroy_all
User.destroy_all
Building.destroy_all
Room.destroy_all
TutoringTimeSlot.destroy_all
BookedSlot.destroy_all
TutorNote.destroy_all

puts "Seeding Data"

puts "Creating Schools"
  School.create!(name:"Generic University")
  School.create!(name:"Upstate College")
  School.create!(name:"Fallon High School")
  School.create!(name:"Lincoln Middle School")

puts "Creating Users"
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
  
  puts "Creating Buildings"
  24.times do
    Building.create!(name:Faker::Educator.campus + " Hall", school_id:rand(1..4))
  end

  puts "Creating Rooms"
  72.times do
    Room.create!(name:'Room ' + rand(1..500).to_s, building_id:rand(1..24))
  end

  puts 'Creating Tutoring Time Slots'
  40.times do
    start_time = DateTime.parse(Faker::Time.forward(23,:afternoon).to_s)
    end_time = start_time+2.hours
    TutoringTimeSlot.create!(created_by:[3,6,9,12].sample, 
      tutor_capacity:2, 
      tutee_capacity:6, 
      booked_status: false, 
      start_time: start_time, 
      end_time: end_time, 
      school_id:rand(1..4), 
      room_id:rand(1..10), 
      open_status: false)
  end

  puts "Creating Booked Time Slots"
  20.times do
    BookedSlot.create!(tutor_id:[2,3,5,6,8,9,11,12].sample, tutee_id:[1,4,7,10].sample, tutoring_time_slot_id:rand(1..40))
  end

  puts "Create Notes"
  20.times do
    TutorNote.create(tutor_id:[2,3,5,6,8,9,11,12].sample, tutee_id:[1,4,7,10].sample, note:Faker::Movies::StarWars.quote)
  end

  puts "Adding Tutor Slot Signups"
  20.times do
    TutorSlotSignUp.create(tutor_id:[2,3,5,6,8,9,11,12].sample, tutoring_time_slot_id:rand(1..40))
  end

  puts "The Field Is Planted"
