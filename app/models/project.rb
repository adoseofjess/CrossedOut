class Project < ActiveRecord::Base
  attr_accessible :title, :description, :user_id
  
  has_many :tasks
  belongs_to :user
  
end
