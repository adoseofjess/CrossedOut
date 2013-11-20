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
    
    @team = Team.new({:title => params[:team][:title]})
    @url = new_user_url
    
    if params[:member_ids].length != 0 
      @user = User.find_by_username(params[:member_ids])
      @team.member_ids = [@user.id]
    end
    # @team = Team.new(params[:team])
    
    if @team.save
      # @team.member_ids.each do |id| 
#         msg = UserMailer.welcome_email(User.find(id).username, @team, @url)
#         msg.deliver
#       end
      if params[:member_ids].length != 0
        msg = UserMailer.welcome_email(@user.username, @team, @url)
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
  
  def invite_member
    
    @email = params[:email] + "." + params[:format]
    @user = User.find_by_username(@email)
    @team = Team.find(params[:team_id])
    
    if @user.nil?
      @url = new_user_url
      msg = UserMailer.welcome_email(@email, @team, @url)
      msg.deliver
      render :json => true
    else
      @team.members<<@user
      @url = new_session_url
    
      msg = UserMailer.welcome_email(@email, @team, @url)
      msg.deliver
      render :json => true
    end
  end
  
  def add_member
    # /teams/:team_id/add/:email
  end
end
