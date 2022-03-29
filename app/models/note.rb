class Note < ApplicationRecord
    belongs_to :user
    belongs_to :study_session

end
