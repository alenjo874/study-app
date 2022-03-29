Rails.application.routes.draw do
  
  resources :todo_lists
  resources :user_sessions
  resources :study_sessions
  resources :notes
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
