class ProjectsController < ApplicationController
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
    # @project = Project.save(params[:project])
  end
  
  def destroy
  end
end
