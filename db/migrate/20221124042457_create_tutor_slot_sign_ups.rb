class CreateTutorSlotSignUps < ActiveRecord::Migration[6.1]
  def change
    create_table :tutor_slot_sign_ups do |t|
      t.integer :tutor_id
      t.integer :tutoring_time_slot_id

      t.timestamps
    end
  end
end
