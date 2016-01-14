class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update]
  respond_to :json


  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
      render json: {message: 'success'}
    else
      render json: @user.errors.messages
    end
  end

  def destroy
    log_out
    redirect_to root_url
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

  # Before filters

  # Confirms a logged-in user.
  def logged_in_user
    unless logged_in?
      store_location
      flash[:danger] = "Please log in."
      redirect_to login_url
    end
  end

  # Confirms the correct user.
  def correct_user
    @user = User.find(params[:id])
    redirect_to(root_url) unless @user == current_user
  end
end