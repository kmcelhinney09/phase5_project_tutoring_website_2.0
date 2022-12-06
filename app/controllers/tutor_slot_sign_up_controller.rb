class TutorSlotSignUpController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def destroy
    tutor_sign_up = TutorSlotSignUp.find_by(id:params[:id])
    tutor_time_slot = TutoringTimeSlot.find_by(id:tutor_sign_up.tutoring_time_slot_id)
    tutor_sign_up.destroy
    tutor_time_slot.open_status_update
    tutor_time_slot.booked_status_update
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
