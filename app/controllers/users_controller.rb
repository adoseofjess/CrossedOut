class UsersController < ApplicationController
  before_filter :require_current_user!, :only => [:show]
  before_filter :require_no_current_user!, :only => [:create, :new]
  
  def index
    @users = User.all
    render :json => @users
  end
  
  def create
    @user = User.new(params[:user])
    
    if @user.save
      self.current_user = @user
      redirect_to user_url(@user)
    else
      render :json => @user.errors.full_messages
    end
  end
  
  def new
    @user = User.new
  end
  
  def show
    if params[:id]
      @user = User.find(params[:id])
      @tasks = Task.find_all_by_user_id(@user.id)
    else
      redirect_to user_url(current_user)
    end
  end
  
  def destroy
    if params[:team_id]
      team = Team.find(params[:team_id])
      user = User.find(params[:id])
      team.members.delete(user)
      render :json => "Hi"
    else
      user = User.find(params[:id])
      user.destroy!
    end
  end
end
