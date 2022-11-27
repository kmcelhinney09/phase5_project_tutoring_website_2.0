class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  skip_before_action :authorized, only: :create

  
  def show
    #TODO: Create admin varification
    current_user = User.find(session[:user_id])
    render json: current_user, status: :ok
  end

  def create
    params = user_params
    school_id = School.find_by(name:params[:school]).id
    user = User.create!(full_name:params[:full_name],email:params[:email],school_id:school_id,password:params[:password],time_zone:params[:time_zone],grade:params[:grade], role:params[:role])
    session[:user_id] = user.id
    render json: user, status: :created
  end

  private
  
  def current_user
    current_user = User.find(session[:user_id])
  end
  
  #error handleing
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:email,:password,:full_name,:school,:time_zone, :grade, :role)
  end
end
