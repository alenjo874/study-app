class UsersController < ApplicationController
    def index 
        users = User.all
        render json: users, status: :ok
    end

    def show 
        show_user = User.find_by!(id: params[:id])
        render json: show_user, status: :ok
    end

    def create 
        create_user = User.create!(user_params)
        render json: create_user, status: :ok
    end

    def update 
        update_user = User.find_by!(id: params[:id])
        update_user.update(user_params)
        render json: update_user, status: :accepted
    end

    def destroy
        destroy_user = User.find_by!(id: params[:id])
        destroy_user.destroy
    end

    private 

    def user_params 
        params.permit(:name )

    end
end
