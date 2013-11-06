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
      redirect_to project_url(@project.id)
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
  end
end
