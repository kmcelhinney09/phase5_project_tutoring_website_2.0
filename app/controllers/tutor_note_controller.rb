class TutorNoteController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def create
    note = TutorNote.create!(tutor_note_params)
    render json: note, status: :created
  end

  def destroy
    note = TutorNote.find_by(id:params[:id])
    note.destroy
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

  def tutor_note_params
    params.permit(:id,:tutor_id,:note, :tutee_id)
  end
end
