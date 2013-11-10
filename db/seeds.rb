# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({:username => "jessjkim@gmail.com", :password => "helloworld"})
User.create({:username => "jason", :password => "helloworld"})
User.create({:username => "sam", :password => "helloworld"})
User.create({:username => "jean", :password => "helloworld"})
Project.create({:title => "GREs", :description => "Learn to code", :projectable_id => 1, :projectable_type => "User"})
Project.create({:title => "App Academy", :description => "Study for GREs", :projectable_id => 1, :projectable_type => "Team"})
Project.create({:title => "Thanksgiving planning", :description => "Figure out what to do for Thanksgiving", :projectable_id => 1, :projectable_type => "User"})
Project.create({:title => "Clean Up Office", :description => "Make the office livable", :projectable_id => 1, :projectable_type => "Team"})
Task.create({:title => "Study", :description => "Study for App Academy", :user_id => 1, :project_id => 1})
Task.create({:title => "Final project", :description => "Work on final project", :user_id => 1, :project_id => 1})
Task.create({:title => "Buy book", :description => "Find GRE book", :user_id => 1, :project_id => 2})
Task.create({:title => "Go to the library", :description => "Find GRE book", :user_id => 1, :project_id => 2})
Team.create({:title => "App Academy Team"})