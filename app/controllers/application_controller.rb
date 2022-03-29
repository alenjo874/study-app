class ApplicationController < ActionController::API
  include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :handle_invalid

private 

def handle_not_found(exception)
  render json: {error: exception.message}
end  

def handle_invalid(invalid)
  render json: {error: invalid.record.errors}
end  

end
