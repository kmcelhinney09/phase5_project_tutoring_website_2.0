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
TutorSlotSignUp.destroy_all
Subject.destroy_all

puts "Seeding Data"

Dir[Rails.root.join('db/seeds/*.rb')].sort.each do |file|
  puts "Processing #{file.split('/').last}"
  require file
  end
  
#need to make sure that open_status and booked_status are correct
  all = TutoringTimeSlot.all
  all.each do |slot|
    slot.booked_status_update
    slot.open_status_update
  end


puts "The Field Is Planted"
