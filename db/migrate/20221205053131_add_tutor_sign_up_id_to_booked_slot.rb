class AddTutorSignUpIdToBookedSlot < ActiveRecord::Migration[6.1]
  def change
    add_column :booked_slots, :tutor_slot_sign_up_id, :integer
  end
end
