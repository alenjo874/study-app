class UserSessionSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :study_session_id
end
