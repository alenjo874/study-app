class CreateTodoLists < ActiveRecord::Migration[6.1]
  def change
    create_table :todo_lists do |t|
      t.string :task
      t.boolean :completed
      t.integer :user_id

      t.timestamps
    end
  end
end
