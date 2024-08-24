class CommentsController < ApplicationController
  before_action :set_comment, only: %i[show update destroy]

  # GET /comments
  def index
    @comments = Comment.order(created_at: :desc).map { |comment| build_comment_data(comment) }
    render json: @comments
  end

  # GET /comments/1
  def show
    render json: build_comment_data(@comment)
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy!
  end

  # GET /comments/by_seller/:seller_id
  def by_seller
    if params[:seller_id].present?
      @comments = Comment.by_seller(params[:seller_id])
      render json: @comments.map { |comment| build_comment_data(comment) }
    else
      render json: { error: 'seller_id is not provided' },status: :bad_request
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_comment
    @comment = Comment.find(params[:id])
  end

  # Build the data structure for a comment
  def build_comment_data(comment)
    {
      comment: comment,
      user_profile: fetch_user_profile(comment.user_id),
      product: fetch_product(comment.products_id)
    }
  end

  # Fetch the user profile associated with a comment
  def fetch_user_profile(user_id)
    BuyerProfile.find_by(user_id: user_id) || {}
  end

  # Fetch the product associated with a comment
  def fetch_product(product_id)
    Product.find_by(id: product_id) || {}
  end

  # Only allow a list of trusted parameters through.
  def comment_params
    params.require(:comment).permit(:products_id, :body, :user_id, :seller_id)
  end
end
