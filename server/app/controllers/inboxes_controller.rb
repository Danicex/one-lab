class InboxesController < ApplicationController
  before_action :set_inbox, only: %i[ show update destroy ]
  before_action :scan_text, only: %i[ create update ]

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
 def scan_text
  #if any string from the flag_text is found render a flag message "  "
  

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
    @flag_text = [
      "WhatsApp",
      "Facebook Messenger",
      "Instagram",
      "Snapchat",
      "WeChat",
      "Telegram",
      "Viber",
      "LINE",
      "Signal",
      "Discord",
      "Twitter",
      "X",
      "Kik",
      "Skype",
      "Twitch",
      "TikTok",
      "Clubhouse",
      "Slack",
      "Microsoft Teams",
      "iMessage",
      "Google Chat"
    ]
  
    if @flag_text.any? { |word| inbox_params[:content].include?(word) }
    @flag_message = "Sorry, due to Onelabs policies, you can't send this message because it contains flagged text"
    render json: { flag_message: @flag_message }, status: :unprocessable_entity
    else
      @inbox = Inbox.new(inbox_params)
      if @inbox.save
        if  params[:inbox][:file == true].present?
          attach_file
        end
        render json: @inbox, status: :created, location: @inbox
      else
        render json: {error: @inbox.errors, flag_message: @flag_message, status: :unprocessable_entity}
      end
    end
  end
  
  def update
    @flag_text = [
      "WhatsApp",
      "Facebook Messenger",
      "Instagram",
      "Snapchat",
      "WeChat",
      "Telegram",
      "Viber",
      "LINE",
      "Signal",
      "Discord",
      "Twitter",
      "X",
      "Kik",
      "Skype",
      "Twitch",
      "TikTok",
      "Clubhouse",
      "Slack",
      "Microsoft Teams",
      "iMessage",
      "Google Chat"
    ]
  
    if @flag_text.any? { |word| inbox_params[:content].include?(word) }
    @flag_message = "Sorry, due to Onelabs policies, you can't send this message because it contains flagged text"
      render json: { flag_message: @flag_message }, status: :unprocessable_entity
    else
      if @inbox.update(inbox_params)
        render json: @inbox
      else
        render json:{ error: @inbox.errors, flag_message: @flag_message, status: :unprocessable_entity}
      end
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
      params.require(:inbox).permit(:content,  :seller_id,  :buyer_id, :buyer, :video, :image,  :audio, :file)
    end

    def attach_file
      @inbox.image.attach(params[:inbox][:image])
      @inbox.update(image_url: url_for(@inbox.image))
      @inbox.video.attach(params[:inbox][:video])
      @inbox.update(video_url: url_for(@inbox.image))
      @inbox.audio.attach(params[:inbox][:audio])
      @inbox.update(audio_url: url_for(@inbox.image))
    end
end
