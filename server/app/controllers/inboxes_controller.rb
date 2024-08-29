class InboxesController < ApplicationController
  before_action :set_inbox, only: %i[ show update destroy ]

  def index
    @inboxes = Inbox.all
    render json: @inboxes
  end

  def show
    render json: @inbox
  end

  def create
    @inbox = Inbox.new(inbox_params)
    if @inbox.save
      render json: @inbox, status: :created, location: @inbox
    else
      render json: @inbox.errors, status: :unprocessable_entity
    end
  end

  def update
    if @inbox.update(inbox_params)
      render json: @inbox
    else
      render json: @inbox.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @inbox.destroy!
  end

  def by_seller
    @inboxes = Inbox.where(:seller_id).order(created_at: :desc)
    render json: @inboxes
  end
  
  def by_buyer
    @inboxes = Inbox.where(:buyer_id).order(created_at: :desc)
    render json: @inboxes
  end

  private
    def set_inbox
      @inbox = Inbox.find(params[:id])
    end

    def inbox_params
      params.require(:inbox).permit(:content,  :seller_id,  :buyer_id)
    end
end
