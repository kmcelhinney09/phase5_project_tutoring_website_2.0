class CreateBuildings < ActiveRecord::Migration[6.1]
  def change
    create_table :buildings do |t|
      t.string :name
      t.integer :school_id

      t.timestamps
    end
  end
end
