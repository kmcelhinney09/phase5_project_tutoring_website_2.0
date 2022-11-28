class SchoolsController < ApplicationController

  def show
    #TODO: Create admin varification change to user controler under index
    users = User.where(school_id:params[:id])
    render json:users, status: :created
  end

  def tutoring
    #TODO: change from tutoring to show
    school = School.find(params[:id])
    render json:school, status: :ok
  end
  
  private
  def current_user
    current_user = User.find(session[:user_id])
  end
end
