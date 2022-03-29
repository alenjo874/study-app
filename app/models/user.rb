class User < ApplicationRecord
    has_many :notes
    has_many :todo_lists
    has_many :user_sessions
    has_many :study_sessions, through: :user_sessions
end
