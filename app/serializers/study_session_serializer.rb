class StudySessionSerializer < ActiveModel::Serializer
  attributes :id, :title, :session_overview, :session_date

  has_many :notes
end
