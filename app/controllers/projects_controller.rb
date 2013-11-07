class ProjectsController < ApplicationController
  respond_to :json
  # respond_to :html, :only => [:index]
  
  def index
    @projects = Project.all
    render :json => @projects
  end
  
  def new
    @project = Project.new
  end
  
  def create
    @project = Project.new(params[:project])
    if @project.save
      render :json => @project
    else
      render :json => @project.errors.full_messages
    end
  end
  
  def show
    @project = Project.find(params[:id])
  end
  
  def update
    @project = Project.find(params[:id])
    @project.update_attributes(params[:project])
    render :json => @project
  end
  
  def destroy
    @project = Project.find(params[:id])
    if @project.destroy
      render :json => @project
    else
      render :json => @project.errors.full_messages, :status => 422
    end
    
  end
end
