class AddSchoolIdToSubject < ActiveRecord::Migration[6.1]
  def change
    add_column :subjects, :school_id, :integer
  end
end
