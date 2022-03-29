Rails.application.routes.draw do
  
  resources :todo_lists
  resources :user_sessions
  resources :study_sessions
  resources :notes
  resources :users
  get "/user_todo_list/:id", to: 'todo_lists#user_todo_list'
  get "/user_sessions_notes/:id", to: 'user_sessions#user_sessions_notes'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
