class BookedSlotController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    booked_slot = BookedSlot.create!(booked_slot_params)
    time_slot = TutoringTimeSlot.find_by(id:params[:tutoring_time_slot_id])
    time_slot.booked_status_update
    render json: booked_slot, status: :created
  end

  def destroy
    booked_slot = BookedSlot.find_by(id:params[:id])
    time_slot = TutoringTimeSlot.find_by(id:booked_slot.tutoring_time_slot_id)
    booked_slot.destroy
    time_slot.booked_status_update
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

  def booked_slot_params
    params.permit(:id,:tutor_id,:tutoring_time_slot_id, :tutee_id, :tutor_slot_sign_up_id)
  end
end
