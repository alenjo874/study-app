class NotesController < ApplicationController

    def index 
        notes = Note.all
        render json: notes, status: :ok
    end

    def show 
        show_note = Note.find_by!(id: params[:id])
        render json: show_note, status: :ok
    end

    def create 
        create_note = Note.create!(note_params)
        render json: create_note, status: :ok
    end

    def update 
        update_note = Note.find_by!(id: params[:id])
        update_note.update(note_params)
        render json: update_note, status: :accepted
    end

    def destroy
        destroy_note = Note.find_by!(id: params[:id])
        destroy_note.destroy
    end

    private 

    def note_params 
        params.permit(:subject, :study_note, :user_id, :study_session_id )

    end
end
