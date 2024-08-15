class BuyerProfilesController < ApplicationController
  before_action :set_buyer_profile, only: %i[show update destroy]
  before_action :set_current_user

  # GET /buyer_profiles
  def index
    @buyer_profile = @user.buyer_profile
    render json: @buyer_profile
  end

  # GET /buyer_profiles/1
  def show
    render json: @buyer_profile
  end

  # POST /buyer_profiles
  def create
    @buyer_profile = @user.build_buyer_profile(buyer_profile_params)
    
    if @buyer_profile.save
      attach_image if params[:buyer_profile][:image].present?
      render json: @buyer_profile, status: :created, location: @buyer_profile
    else
      render json: @buyer_profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /buyer_profiles/1
  def update
    if @buyer_profile.update(buyer_profile_params)
      attach_image if params[:buyer_profile][:image].present?
      render json: @buyer_profile
    else
      render json: @buyer_profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /buyer_profiles/1
  def destroy
    @buyer_profile.destroy!
    head :no_content
  end

  private

  def set_buyer_profile
    @buyer_profile = BuyerProfile.find_by!(user_id: params[:user_id])
  end

  def set_current_user
    @user = User.find(params[:user_id])
  end

  def attach_image
    @buyer_profile.image.attach(params[:buyer_profile][:image])
    @buyer_profile.update(image_url: url_for(@buyer_profile.image))
  end

  def buyer_profile_params
    params.require(:buyer_profile).permit(:name, :phone_number, :user_id, :image, :image_url)
  end
end
