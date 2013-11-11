class UserMailer < ActionMailer::Base
  default from: "admin@crossedout.com"
  
  def welcome_email(email, team, url)
    @email = email
    @team = team
    @url  = url
    p @email
    p @team
    p @url
    mail(to: email, subject: "Join your team on CrossedOut")
  end
end
