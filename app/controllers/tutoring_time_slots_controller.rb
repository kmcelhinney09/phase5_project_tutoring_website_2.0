class TutoringTimeSlotsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  def show
    time_slot = TutoringTimeSlot.find_by(id:params[:id])
    render json: time_slot, status: :ok
  end

  def create
    time_slot = TutoringTimeSlot.create!(tutoring_time_slot_params)
    render json: time_slot, status: :created
  end

  def destroy
    tutoring_time_slot = TutoringTimeSlot.find_by(id:params[:id])
    tutoring_time_slot.destroy
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

  def tutoring_time_slot_params
    params.permit(:tutor_capacity, :tutee_capacity, :start_time, :end_time, :school_id, :room_id, :booked_status, :open_status, :created_by)
  end
end
