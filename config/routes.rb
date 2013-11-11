Crossedout::Application.routes.draw do
  resources :users, :only => [:index, :create, :new, :show] 
  
  resources :teams do
    resources :users, :only => [:index]
    post '/:email', to: 'teams#add_member'
  end
    
  resource :session, :only => [:create, :destroy, :new]
  
  resources :tasks, :only => [:index, :new, :create, :edit, :show, :update, :destroy]
  
  resources :projects, :only => [:index, :new, :create, :edit, :show, :update, :destroy]
  
  resources :user_team_joins

  root :to => "static_pages#root"
end