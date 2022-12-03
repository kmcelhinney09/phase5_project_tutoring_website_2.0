class SchoolsController < ApplicationController

  def show
    #TODO: change from tutoring to show
    school = School.find(params[:id])
    render json:school, status: :ok
  end
  
  private
  def current_user
    current_user = User.find(session[:user_id])
  end
end
