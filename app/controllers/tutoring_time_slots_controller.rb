class TutoringTimeSlotsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity
  def show
    time_slot = TutoringTimeSlot.find_by(id:params[:id])
    render json: time_slot, status: :ok
  end

  private
  
  def current_user
    current_user = User.find(session[:user_id])
  end

  #error handling
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end
end
