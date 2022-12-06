class SubjectController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    subject = Subject.create!(subject_params)
    render json: subject, status: :created
  end

  def destroy
    subject = Subject.find_by(id:params[:id])
    subject.destroy
    head :no_content
  end

  private
  
  def current_user
    current_user = User.find(session[:user_id])
  end

  #error handling
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

  def subject_params
    params.permit(:id,:name,:school_id)
  end
end
