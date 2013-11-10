class RemoveUserTeamJoinsTable < ActiveRecord::Migration
  def change
    drop_table :user_team_joins
  end
end
