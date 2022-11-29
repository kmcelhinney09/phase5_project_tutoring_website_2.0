Rails.application.routes.draw do
  
  resources :tutoring_time_slots
  resources :schools
  resources :users

  get "/auth", to: 'users#show'
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/school/:id/tutoring", to: "schools#tutoring"
  post "/building", to: "building#create"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
