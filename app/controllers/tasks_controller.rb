class TasksController < ApplicationController
  def index
    @tasks = Task.all
    render :json => @tasks
  end
  
  def new
    @task = Task.new
  end
  
  def edit
    @task = Task.find(params[:id])
  end
  
  def update
    @task = Task.find(params[:id])
 
    if @task.update_attributes(params[:task])
      redirect_to user_url(@task.user_id)
    else
      render :json => @task.errors.full_messages
    end
  end
  
  def create
    @task = Task.new(params[:task])
    
    if @task.save
      render :json => @task
    else
      render :json => @task.errors, :status => 422
    end
  end
  
  def show
    @task = Task.find(params[:id])
    render :json => @task
  end
end
