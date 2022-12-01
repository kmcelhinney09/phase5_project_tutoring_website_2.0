class RoomController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    room = Room.create!(name:params[:name], building_id:params[:building_id])
    render json: room, status: :created
  end

  def update
    room = Room.find_by(id:params[:id])
    if room.building.name != params[:building_name]
      building = Building.find_by(name:params[:building_name])
      room.building_id = building.id
      room.save!
    end
    if room.name != params[:name]
      room.name = params[:name]
      room.save!
    end
    render json: room, status: :accepted
  end

  def destroy 
    room = Room.find_by(id:params[:id])
    room.destroy
    head :no_content
  end

  private
  #error handling
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:id,:name, :building_name)
  end

  def current_user
    current_user = User.find(session[:user_id])
  end
end
