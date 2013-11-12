class Team < ActiveRecord::Base
  attr_accessible :title, :user_id, :member_ids
  
  has_many :user_team_joins
  
  has_many :members, through: :user_team_joins, class_name: "User"

  has_many :projects, as: :projectable
  
  def as_json(options={})
    super(:include => [:members, :projects => {:include => [:tasks]}])
  end
  
end
