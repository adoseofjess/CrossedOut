class TeamsController < ApplicationController
  def index
    @teams = Team.all
    render :json => @teams
  end
  
  def new
    @team = Team.new
  end
  
  def edit
    @team = Team.find(params[:id])
  end
  
  def update
    @team = Team.find(params[:id])
    @team.update_attributes(params[:team])
    render :json => @team
  end
  
  def create

    @team = Team.new(params[:team])
    @team.member_ids = params[:member_ids]
    @url = new_user_url
    
    
    if @team.save
      @team.member_ids.each do |id| 
        msg = UserMailer.welcome_email(User.find(id).username, @team, @url)
        msg.deliver
      end
      render :json => @team, :include => :users
    else
      render :json => @team.errors.full_messages, :status => 422
    end
  end
  
  def show
    @team = Team.find(params[:id])
    render :json => @team
  end
  
  def destroy
    @team = Team.find(params[:id])
    if @team.destroy
      render :json => @team
    else
      render :json => @team.errors.full_messages, :status => 422
    end
  end
  
  def add_member
    @user_id = params[:user_id]
    @email = params[:email] + "." + params[:format]
   
    @user = User.find(@user_id)
    @team = Team.find(params[:team_id])
    @url = new_user_url
    
    msg = UserMailer.welcome_email(@email, @team, @url)
    msg.deliver
    render :json => true
  end
end
