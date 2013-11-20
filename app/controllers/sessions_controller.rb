class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]
  
  def create
    p params
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    
    if user.nil?
      render :json => "Credentials were wrong"
    else
      self.current_user = user
      redirect_to root_url
    end
  end
  
  def destroy
    logout_current_user!
    redirect_to index_url
  end
  
  def new
  end
end
