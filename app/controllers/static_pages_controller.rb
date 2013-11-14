class StaticPagesController < ApplicationController
  def root
    @users = User.all
  end
  
  def login
  end
end