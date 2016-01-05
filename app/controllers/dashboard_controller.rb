class DashboardController < ApplicationController
  before_action :ensure_logged_in

  def index

  end

  private

  def ensure_logged_in
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
  end

end