class TodoListSerializer < ActiveModel::Serializer
  attributes :id, :task, :completed, :user_id
end
