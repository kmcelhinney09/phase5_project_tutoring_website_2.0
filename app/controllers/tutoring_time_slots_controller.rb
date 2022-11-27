class TutoringTimeSlotsController < ApplicationController
  def show
    #TODO: use find_by because it return nill and you can use for error handeling
    time_slot = TutoringTimeSlot.find(params[:id])
    render json: time_slot, status: :ok
  end

  private
  
  def current_user
    current_user = User.find(session[:user_id])
  end
end
