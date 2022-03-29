class StudySessionsController < ApplicationController
    def index 
        study_sessions = StudySession.all
        render json: study_sessions, status: :ok
    end

    def show 
        show_study_session = StudySession.find_by!(id: params[:id])
        render json: show_study_session, status: :ok
    end

    def create 
        create_study_session = StudySession.create!(study_session_params)
        render json: create_study_session, status: :ok
    end

    def update 
        update_study_session = StudySession.find_by!(id: params[:id])
        update_study_session.update(study_session_params)
        render json: update_study_session, status: :accepted
    end

    def destroy
        destroy_study_session = StudySession.find_by!(id: params[:id])
        destroy_study_session.destroy
    end

    private 

    def study_session_params 
        params.permit(:title, :session_overview, :session_date )

    end
end
