class UserTeamJoin < ActiveRecord::Base
  attr_accessible :user_id, :team_id
  
  belongs_to :member, class_name: "User", foreign_key: :user_id
  belongs_to :team
end
  
