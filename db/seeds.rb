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

puts "Seeding Data"

puts "Creating Schools"
  School.create!(name:"Generic University")
  School.create!(name:"Upstate College")
  School.create!(name:"Fallon High School")
  School.create!(name:"Lincoln Middle School")

puts "Creating Users"

def fake_data()
  fake_name = Faker::Name.name
  fake_email = Faker::Internet.email
  [fake_name, fake_email]
end
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