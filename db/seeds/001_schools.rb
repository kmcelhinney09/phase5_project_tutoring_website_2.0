
puts "Creating Schools"
  School.create(name:"Generic University")
  School.create(name:"Upstate College")
  School.create(name:"Fallon High School")
  School.create(name:"Lincoln Middle School")
  p "created #{School.count} Schools"