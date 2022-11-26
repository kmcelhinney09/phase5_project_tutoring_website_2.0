
puts "Creating Schools"
  School.create(name:"Generic University")
  School.create(name:"Upstate College")
  p "created #{School.count} Schools"