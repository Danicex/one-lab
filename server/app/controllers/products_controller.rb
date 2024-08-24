class ProductsController < ApplicationController
  before_action :set_product, only: %i[show update destroy]
  before_action :set_current_seller, only: %i[create index]

  # GET /products
  def index
    @products = @seller.products.order(created_at: :desc)
    render json: { products: @products }
  end

  # GET /products/1
  def show
    render json: @product
  end

  # POST /products
  def create
    @product = @seller.products.build(product_params)

    if @product.save
      attach_image if params[:product][:image].present?
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(product_params)
      attach_image if params[:product][:image].present?
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy!
    head :no_content
  end

  # Custom Actions

  # GET /products/store
  def store
    @store_product = Product.recent
    render json: @store_product
  end

  # GET /products/category
  def category
    if params[:category]
      @product_category = Product.by_category(params[:category])
      render json: @product_category
    else
      render json: { error: 'Category not provided' }, status: :bad_request
    end
  end

  # GET /products/search
  def search
    query = params[:q]
    @products = Product.search_by_name_or_description(query)

    if @products.any?
      render json: { products: @products }
    else
      render json: { message: 'No products found' }, status: :not_found
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def set_current_seller
    @seller = Seller.find(params[:seller_id])
  end

  def product_params
    params.require(:product).permit(:name, :category, :price, :description, :delivery_time, :quantity, :seller_id, :image, :currency)
  end

  def attach_image
    @product.image.attach(params[:product][:image])
    @product.update(image_url: rails_blob_url(@product.image))
  end
end
