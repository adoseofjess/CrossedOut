class Team < ActiveRecord::Base
  attr_accessible :title, :user_id
  
  has_many :user_team_joins
  
  has_many :users, through: :user_team_joins

  has_many :projects, as: :projectable
  
end
