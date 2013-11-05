Crossedout::Application.routes.draw do
  resources :users, :only => [:create, :new, :show]

  resource :session, :only => [:create, :destroy, :new]
  
  resources :tasks, :only => [:new, :create, :edit, :show, :update, :destroy]
  
  resources :projects, :only => [:new, :create, :edit, :show, :update, :destroy]

  root :to => "users#show"
end
