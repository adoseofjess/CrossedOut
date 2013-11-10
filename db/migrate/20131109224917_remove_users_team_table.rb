class RemoveUsersTeamTable < ActiveRecord::Migration
  def change
    drop_table :users_teams
  end
end
