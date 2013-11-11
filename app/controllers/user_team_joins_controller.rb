class UserTeamJoinsController < ApplicationController
  def index
    @userteamjoins = UserTeamJoin.all
    render :json => @userteamjoins
  end
  
  def create
    @userteamjoin = UserTeamJoin.new(params[:user_team_join])
    p params[:user_team_join]
    if @userteamjoin.save
      render :json => @userteamjoin
    else
      render :json => @userteamjoin.errors, :status => 422
    end
  end
end
