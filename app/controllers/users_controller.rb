class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  skip_before_action :authorized, only: :create

  def show
    current_user = User.find(session[:user_id])
    render json: current_user
  end

  def create
    params = user_params
    school_id = School.find_by(name:params[:school]).id
    user = User.create!(full_name:params[:full_name],email:params[:email],school_id:school_id,password:params[:password],grade:params[:grade], role:params[:role])
    session[:user_id] = user.id
    render json: user
  end

  private
  #error handleing
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:email,:password,:full_name,:school,:grade, :role)
  end
end
