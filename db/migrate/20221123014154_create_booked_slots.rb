class CreateBookedSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :booked_slots do |t|
      t.integer :tutor_id
      t.integer :tutee_id
      t.integer :tutoring_time_slot_id

      t.timestamps
    end
  end
end
