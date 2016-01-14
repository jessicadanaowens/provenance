Rails.application.routes.draw do

  get 'sessions/new'
  root 'welcome#index'
  get    'signup'  => 'users#new', :as => :signup
  get    'login'   => 'sessions#new', :as => :login
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy', :as => :logout
  get 'dashboard' => 'dashboard#index', :as => :dashboard
  get 'activation' => 'activations#index'

  resources :users
  resources :items, defaults: { format: 'json' }
  resources :account_activations, only: [:edit]

end
