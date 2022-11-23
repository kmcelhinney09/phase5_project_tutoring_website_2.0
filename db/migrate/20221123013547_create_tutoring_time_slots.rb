class CreateTutoringTimeSlots < ActiveRecord::Migration[6.1]
  def change
    create_table :tutoring_time_slots do |t|
      t.integer :created_by
      t.integer :tutor_capacity
      t.integer :tutee_capacity
      t.boolean :booked_status
      t.datetime :start_time
      t.datetime :end_time
      t.integer :school_id
      t.integer :room_id
      t.boolean :open_status

      t.timestamps
    end
  end
end
