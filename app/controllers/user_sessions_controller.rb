class UserSessionsController < ApplicationController
    def index 
        user_sessions = UserSession.all
        render json: user_sessions, status: :ok
    end

    def show 
        show_user_session = UserSession.find_by!(id: params[:id])
        render json: show_user_session, status: :ok
    end

    def create 
        create_user_session = UserSession.create!(user_session_params)
        render json: create_user_session, status: :ok
    end

    def update
        update_user_session = UserSession.find_by!(id: params[:id])
        update_user_session.update(user_session_params)
        render json: update_user_session, status: :accepted
    end

    def destroy
        destroy_user_session = UserSession.find_by!(id: params[:id])
        destroy_user_session.destroy
    end

    private 

    def user_session_params 
        params.permit(:user_id, :study_session_id )
    end
end
