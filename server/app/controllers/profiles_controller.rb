class ProfilesController < ApplicationController
  before_action :set_profile, only: %i[show update destroy]
  before_action :set_current_seller, only: %i[index create]

  # GET /profiles
  def index
    @profiles = @seller.profiles.order(created_at: :desc)
    render json: @profiles
  end

  # GET /profiles/1
  def show
    render json: @profile
  end

  # POST /profiles
  def create
    @profile = @seller.build_profile(profile_params)

    if @profile.save
      if params[:profile][:image].present?
        attach_image
      end
      render json: @profile, status: :created
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /profiles/1
  def update
    if @profile.update(profile_params)
      if params[:profile][:image].present?
        attach_image
      end
      render json: @profile
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  # DELETE /profiles/1
  def destroy
    @profile.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_profile
    @profile = Profile.find_by!(seller_id: params[:seller_id])
  end

  def set_current_seller
    @seller = Seller.find(params[:seller_id])
  end

  # Only allow a list of trusted parameters through.
  def profile_params
    params.require(:profile).permit(:fullname, :phone_number, :address, :bank_name, :account_number, :bank_code, :currency, :seller_id, :description, :store_name)
  end

  def attach_image
    @profile.image.attach(params[:profile][:image])
    @profile.update(image_url: url_for(@profile.image))
  end
end
