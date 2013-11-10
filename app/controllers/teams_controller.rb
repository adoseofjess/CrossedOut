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
    
    if @team.save
      render :json => @team
    else
      render :json => @team.errors, :status => 422
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
end
