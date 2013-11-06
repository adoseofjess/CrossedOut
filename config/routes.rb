Crossedout::Application.routes.draw do
  resources :users, :only => [:index, :create, :new, :show]

  resource :session, :only => [:create, :destroy, :new]
  
  resources :tasks, :only => [:index, :new, :create, :edit, :show, :update, :destroy]
  
  resources :projects, :only => [:index, :new, :create, :edit, :show, :update, :destroy]

  root :to => "static_pages#root"
end