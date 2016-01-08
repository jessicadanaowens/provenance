class ItemsController < ApplicationController
  respond_to :json

  def create
    @item = Item.create(item_params)
    render json: @item
  end

  def destroy
    if params[:item][:id]
      @id = params[:item][:id]
      @item = Item.find(@id)
    end

    if @item
      @item.delete
      render json: {message: "success"}
    else
      render json: {message: "failure"}
    end
  end

  private

  def item_params
    params.require(:item).permit(:title, :description)
  end

end