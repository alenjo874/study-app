class CreateUserSessions < ActiveRecord::Migration[6.1]
  def change
    create_table :user_sessions do |t|
      t.integer :user_id
      t.integer :study_session_id

      t.timestamps
    end
  end
end
