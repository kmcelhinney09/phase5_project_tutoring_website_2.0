class TutorSlotSignUpController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def destroy
    tutor_slot = TutorSlotSignUp.find_by(id:params[:id])
    tutor_slot.destroy
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

  def tutor_sign_up_params
    params.permit(:id,:tutor_id,:tutoring_time_slot_id)
  end
end
