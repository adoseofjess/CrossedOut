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
    # @members_params = params[:team].delete(:members) || []
 #    p params
 #    p params[:members]
 #    p params[:team]
 #    p "HELLO"
    @team = Team.new(params[:team])
    # @member_params.each { |mp| @team.users.build(mp) }
   #  
   #  p params[:user_id]
    if @team.save
      # @team.users<<(User.find(params[:user_id]))
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

    @email = params[:email]
    p "HIIIIIIII"
    p @email
    render :json => @email
    # @team = params[:team_id]
    # render :json => @email, @team
    # @url = new_user_url
#     msg = UserMailer.welcome_email(@email, @team)
#     msg.deliver!
  end
end
