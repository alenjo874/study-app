class StudySession < ApplicationRecord
    has_many :notes
    has_many :user_sessions 
    has_many :users, through: :user_sessions 
end
