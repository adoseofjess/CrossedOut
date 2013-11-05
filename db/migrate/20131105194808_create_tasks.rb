class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.string :description
      t.datetime :due_date
      t.integer :user_id
      t.integer :project_id

      t.timestamps
    end
  end
end
