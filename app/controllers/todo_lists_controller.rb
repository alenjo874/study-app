class TodoListsController < ApplicationController
    def index 
        todos = TodoList.all
        render json: todos, status: :ok
    end

    def user_todo_list
        todo_list = TodoList.all.where("user_id = ?", params[:id])
        render json: todo_list, status: :ok
    end

    def show 
        show_todo = TodoList.find_by!(id: params[:id])
        render json: show_todo, status: :ok
    end

    def create 
        create_todo = TodoList.create!(todo_params)
        render json: create_todo, status: :ok
    end

    def update 
        update_todo = TodoList.find_by!(id: params[:id])
        update_todo.update(todo_params)
        render json: update_todo, status: :accepted
    end

    def destroy
        destroy_todo = TodoList.find_by!(id: params[:id])
        destroy_todo.destroy
    end

    private 

    def todo_params 
        params.permit(:task, :completed, :user_id)

    end
end
