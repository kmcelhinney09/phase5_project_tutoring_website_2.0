class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  skip_before_action :authorized, only: [:create]

  def index
    user = User.find_by(id:session[:user_id])
    if user.role == "admin"
      users_list = User.where(school_id:user.school_id)
      users = users_list.map{|userInfo| {id:userInfo.id, 
        full_name:userInfo.full_name, 
        email:userInfo.email, 
        role:userInfo.role, 
        grade:userInfo.grade,
        subjects_signed_up:userInfo.subjects_signed_up
        }
      }
      render json: users, status: :ok
    else
      render json: {error: {users: "Not Authorized"}}, status: :unauthorized
    end
  end

  def show
    current_user = User.find(session[:user_id])
    render json: current_user, status: :ok
  end

  def create    
    school_id = School.find_by(name:params[:school]).id
    user = User.create!(user_params)
    user.school_id = school_id
    session[:user_id] = user.id
    render json: user, status: :created
  end
  
  def update
    user = User.find_by(id:params[:id])
    user.update(user_params)
    render json: user, status: :accepted
  end

  def destroy
    user = User.find_by(id:params[:id])
    user.destroy
    head :no_content
  end

  def password_reset
    user = User.find_by(id:params[:id])
    user.update!(user_params)
    render json: user, status: :accepted
  end

  private

  def current_user
    if session.include? :user_id
    current_user = User.find(session[:user_id])
    end
  end
  
  #error handling
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:id,:email,:password, :password_confirmation, :full_name,:school,:time_zone, :grade, :role)
  end
end
