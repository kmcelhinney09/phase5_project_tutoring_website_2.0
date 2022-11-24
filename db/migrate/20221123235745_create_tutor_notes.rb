class CreateTutorNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :tutor_notes do |t|
      t.integer :tutor_id
      t.integer :tutee_id
      t.text :note

      t.timestamps
    end
  end
end
