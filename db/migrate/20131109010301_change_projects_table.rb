class ChangeProjectsTable < ActiveRecord::Migration
  def change
    remove_column :projects, :user_id
    add_column :projects, :projectable_id, :integer
    add_column :projects, :projectable_type, :string
  end
end
