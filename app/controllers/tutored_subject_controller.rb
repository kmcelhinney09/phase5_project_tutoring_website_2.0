class TutoredSubjectController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    tutored_subject = TutoredSubject.create!(tutored_subject_params)
    render json: tutored_subject, status: :created
  end
  
  def destroy
    user = User.find(session[:user_id])
    user.subjects_signed_up.destroy(params[:id])
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

  def tutored_subject_params
    params.permit(:id, :tutor_id, :subject_id)
  end
end
