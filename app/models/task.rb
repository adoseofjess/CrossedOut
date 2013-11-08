class Task < ActiveRecord::Base
  attr_accessible :title, :description, :due_date, :user_id, :project_id, :completed
  
  belongs_to :user
  belongs_to :project
end
