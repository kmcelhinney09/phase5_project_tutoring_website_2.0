class ApplicationController < ActionController::API
  include ActionController::Cookies
  around_action :set_time_zone, if: :current_user
  before_action :authorized
  # set_time_zone code found from Elle Meredith from https://thoughtbot.com/blog/its-about-time-zones

  def  authorized
    return render json:{error:"Not Authorized"}, status: :unauthorized unless session.include? :user_id
  end



def set_time_zone(&block)
  Time.use_zone(current_user.time_zone, &block)
end
end
