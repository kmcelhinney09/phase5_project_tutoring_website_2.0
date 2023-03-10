class BuildingController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    building = Building.create!(name:params[:name], school_id:params[:school_id])
    render json: building, status: :created
  end

  def update
    building = Building.find_by(id:params[:id])
    building.name = params[:name]
    building.save!
    render json: building, status: :accepted
  end

  def destroy
    building = Building.find_by(id:params[:id])
    building.destroy
    head :no_content
  end

  private
  #error handling
  def render_unprocessable_entity(invalid)
    render json:{error: invalid.record.errors}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:id, :name, :school_id)
  end

  def current_user
    current_user = User.find(session[:user_id])
  end
end
