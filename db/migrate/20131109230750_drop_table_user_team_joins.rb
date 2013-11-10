class DropTableUserTeamJoins < ActiveRecord::Migration
  def change
    drop_table :userteamjoins
  end
end
