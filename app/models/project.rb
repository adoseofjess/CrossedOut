class Project < ActiveRecord::Base
  attr_accessible :title, :description, :projectable_id, :projectable_type
  
  belongs_to :projectable, polymorphic: true
  has_many :tasks
  
end
