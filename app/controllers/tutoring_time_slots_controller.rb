class TutoringTimeSlotsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  
  def index
    user = User.find_by(id:session[:user_id])
    school_id = user.school_id
    tutoring_slots = TutoringTimeSlot.where(school_id:school_id)
    render json: tutoring_slots, status: :ok
  end
  
  def show
    time_slot = TutoringTimeSlot.find_by(id:params[:id])
    render json: time_slot, status: :ok
  end

  def create
    time_slot = TutoringTimeSlot.create!(tutoring_time_slot_params)
    render json: time_slot, status: :created
  end

  def update
    time_slot = TutoringTimeSlot.find_by(id:params[:id])
    time_slot.update(tutoring_time_slot_params)
    render json: time_slot, status: :accepted
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
    params.permit(:id, :tutor_capacity, :tutee_capacity, :start_time, :end_time, :school_id, :room_id, :booked_status, :open_status, :created_by)
  end
end
