class AddUserTeamJoinsTable < ActiveRecord::Migration
  def change
    create_table :userteamjoins do |t|
      t.integer  :user_id
      t.integer  :team_id
    end
  end
end
