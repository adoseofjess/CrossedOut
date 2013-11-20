# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create({:username => "guest", :password => "helloworld"})
User.create({:username => "jessjkim@gmail.com", :password => "helloworld"})
User.create({:username => "jason@gmail.com", :password => "helloworld"})
User.create({:username => "sam@gmail.com", :password => "helloworld"})
User.create({:username => "jean@gmail.com", :password => "helloworld"})
User.create({:username => "jae@gmail.com", :password => "helloworld"})

Project.create({:title => "Practice Chopin etudes", :description => "", :projectable_id => 1, :projectable_type => "User"})
Project.create({:title => "Learn sign language", :description => "", :projectable_id => 1, :projectable_type => "User"})
Project.create({:title => "Cook filet mignon", :description => "", :projectable_id => 1, :projectable_type => "User"})
Project.create({:title => "Take the GREs", :description => "", :projectable_id => 1, :projectable_type => "User"})

Team.create({:title => "LA Book Club"})
Team.create({:title => "Wine Tasting"})
Team.create({:title => "5k Training Group"})
Team.create({:title => "Saturday Rock Climbing"})

UserTeamJoin.create({:user_id => 1, :team_id => 1})
UserTeamJoin.create({:user_id => 1, :team_id => 2})
UserTeamJoin.create({:user_id => 1, :team_id => 3})
UserTeamJoin.create({:user_id => 1, :team_id => 4})

Project.create({:title => "Life of Pi", :description => "", :projectable_id => 1, :projectable_type => "Team"})
Project.create({:title => "Plan Napa Valley trip", :description => "", :projectable_id => 2, :projectable_type => "Team"})
Project.create({:title => "Look for gym membership", :description => "", :projectable_id => 3, :projectable_type => "Team"})
Project.create({:title => "Conquer overhang climb", :description => "", :projectable_id => 4, :projectable_type => "Team"})

Task.create({:title => "Practice for piano lesson", :description => "", :user_id => 1, :project_id => 1})
Task.create({:title => "Practice sign language alphabet", :description => "Work on final project", :user_id => 1, :project_id => 2})
Task.create({:title => "Buy cook book", :description => "Find GRE book", :user_id => 1, :project_id => 3})
Task.create({:title => "Go to the library", :description => "Find GRE book", :user_id => 1, :project_id => 4})
