Rails.application.routes.draw do
  
  resources :tutoring_time_slots
  resources :schools
  resources :users
  resources :room, only: [:create, :update, :destroy]
  resources :building, only: [:create, :update, :destroy]
  resources :tutor_slot_sign_up, only: [:create, :destroy]
  resources :booked_slot, only: [:create, :destroy]
  resources :tutor_note, only: [:create, :destroy]
  resources :subject, only: [:create, :destroy]

  get "/auth", to: 'users#show'
  post "/login", to: "sessions#create"
  patch "/admin/password_reset/:id", to: "users#password_reset"
  delete "/logout", to: "sessions#destroy"
  post "/tutored_subject", to: "tutored_subject#create"
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
