class SchoolsController < ApplicationController

  def show
      users = User.where(school_id:params[:id])
    render json:users, status: :created
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
