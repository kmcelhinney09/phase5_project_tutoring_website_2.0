class SchoolsController < ApplicationController

  def tutoring
    school = School.find(params[:id])
    render json:school
  end
  
end
