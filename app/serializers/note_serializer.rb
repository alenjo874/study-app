class NoteSerializer < ActiveModel::Serializer
  attributes :id, :subject, :study_note, :user_id, :study_session_id
end
