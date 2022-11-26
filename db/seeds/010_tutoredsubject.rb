puts "Creating Tutored Subjects"
  tutors = [4,5,10,11]
  2.times do
    tutors.each do |tutor|
      TutoredSubject.create!(tutor_id:tutor, subject_id:rand(1..20))
    end
  end