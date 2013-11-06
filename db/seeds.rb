# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({:username => "jessjkim@gmail.com", :password => "helloworld"})
Project.create({:title => "App Academy", :description => "Learn to code", :user_id => 1})
Project.create({:title => "GREs", :description => "Study for GREs", :user_id => 1})
Task.create({:title => "Study", :description => "Study for App Academy", :user_id => 1, :project_id => 1})
Task.create({:title => "Final project", :description => "Work on final project", :user_id => 1, :project_id => 1})
Task.create({:title => "Buy book", :description => "Find GRE book", :user_id => 1, :project_id => 2})