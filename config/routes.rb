Rails.application.routes.draw do

  get 'sessions/new'
  root 'welcome#index'
  get    'signup'  => 'users#new', :as => :signup
  get    'login'   => 'sessions#new', :as => :login
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy', :as => :logout
  get 'dashboard' => 'dashboard#index', :as => :dashboard

  resources :users
  resources :items, defaults: { format: 'json' }
end
