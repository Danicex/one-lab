class InboxesController < ApplicationController
  before_action :set_inbox, only: %i[ show update destroy ]

  def index
    @inboxes = Inbox.order(created_at: :desc).map   do |inboxes|
    {
        inbox: inboxes,
        buyer_profile: BuyerProfile.find_by(user_id: inboxes.buyer_id),
        seller_profile: Profile.find_by(seller_id:  inboxes.seller_id)
    }
    end

    render json: @inboxes
  end

  def show
    render json: @inbox
  end

 

#scope for individual chat for buyers
  def buyerchat
    @inboxes = Inbox.buyerchat( params[:buyer_id], params[:seller_id]).order(created_at:  :desc).map   do |inboxes|
      {
          inbox: inboxes,
          seller_profile: Profile.find_by(seller_id:  inboxes.seller_id),
          buyer_profile: BuyerProfile.find_by(user_id:  inboxes.buyer_id),
      }
    end
    if @inboxes.any?
      render json: @inboxes 
      else
        render json: { error: 'No messages found for the given seller and buyer.' }, status: :not_found
    end
  end


 
#scope for individual seller chats
  def sellerchat
    @inboxes = Inbox.sellerchat(params[:seller_id], params[:buyer_id]).order(created_at:  :desc).map  do |inboxes|
      {
          inbox: inboxes,
          buyer_profile: BuyerProfile.find_by(user_id: inboxes.buyer_id),
          seller_profile: Profile.find_by(seller_id:  inboxes.seller_id) || {},
      }
    end

    if @inboxes.any?
      render json: @inboxes 
      else
        render json: { error: 'No messages found for the given seller and buyer.' }, status: :not_found
    end
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

  private
    def set_inbox
      @inbox = Inbox.find(params[:id])
    
    end

    def inbox_params
      params.require(:inbox).permit(:content,  :seller_id,  :buyer_id, :buyer)
    end
end
