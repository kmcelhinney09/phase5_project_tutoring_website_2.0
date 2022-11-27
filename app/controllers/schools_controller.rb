class SchoolsController < ApplicationController

  def show
    app_user = User.find(session[:user_id])
    if app_user.role == "admin"
      users = User.where(school_id:params[:id])
    else
      users = []
    end
    render json:users
  end

  def tutoring
    school = School.find(params[:id])
    render json:school
  end
  
  private
  def current_user
    current_user = User.find(session[:user_id])
  end
end
