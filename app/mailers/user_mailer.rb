class UserMailer < ActionMailer::Base
  default from: "admin@crossedout.com"
  
  def welcome_email(email, team)
    @email = email
    @team = team
    # @url  = 
    mail(to: email, subject: "Join your team on CrossedOut")
  end
end
