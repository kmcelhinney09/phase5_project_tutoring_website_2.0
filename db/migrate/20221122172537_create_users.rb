class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :email
      t.integer :school_id
      t.string :grade
      t.integer :role
      t.string :password_digest

      t.timestamps
    end
  end
end
