class CreateTutoredSubjects < ActiveRecord::Migration[6.1]
  def change
    create_table :tutored_subjects do |t|
      t.integer :tutor_id
      t.integer :subject_id

      t.timestamps
    end
  end
end
