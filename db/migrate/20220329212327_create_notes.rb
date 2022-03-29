class CreateNotes < ActiveRecord::Migration[6.1]
  def change
    create_table :notes do |t|
      t.string :subject
      t.string :study_note
      t.integer :user_id
      t.integer :study_session_id

      t.timestamps
    end
  end
end
