puts "Creating Tutored Subjects"
  tutors = [2,3,5,6,8,9,11,12]
  2.times do
    tutors.each do |tutor|
      TutoredSubject.create!(tutor_id:tutor, subject_id:rand(1..20))
    end
  end