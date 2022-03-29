class CreateStudySessions < ActiveRecord::Migration[6.1]
  def change
    create_table :study_sessions do |t|
      t.string :title
      t.string :session_overview
      t.date :session_date

      t.timestamps
    end
  end
end
