class TodoList < ApplicationRecord
    belongs_to :user
    
    def self.user_todo_list(id)
        TodoList.all.where("user_id == ?", id)
    end
end
