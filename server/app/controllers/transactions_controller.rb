class TransactionsController < ApplicationController
  before_action :set_transaction, only: %i[show update destroy]
  before_action :set_current_user, except: [:by_seller, :by_product]

  # GET /transactions
  def index
    @transactions = Transaction.order(created_at: :desc).map do |transaction|

      {
        transaction: transaction,
    buyer_profile: BuyerProfile.find_by(user_id: transaction.user_id) || {}, 
    seller_profile: Profile.find_by(seller_id: transaction.seller_id) || {},    
    product_data: Product.find_by(id: transaction.product_id)
      }
    end

    render json: @transactions
  end

  # GET /transactions/1
  def show
    render json: {
      transaction: transaction,
    buyer_profile: BuyerProfile.find_by(user_id: transaction.user_id) || {}, 
    seller_profile: Profile.find_by(seller_id: transaction.seller_id) || {},    
    product_data: Product.find_by(id: transaction.product_id)
    }
  end

  def by_seller
    seller_id = params[:seller_id]
    transactions = Transaction.by_seller(seller_id).map do |transaction|
      {
        transaction: transaction,
        buyer_profile: BuyerProfile.find_by(user_id: transaction.user_id) || {}, 
        seller_profile: Profile.find_by(seller_id: transaction.seller_id) || {},    
        product_data: Product.find_by(id: transaction.product_id)
      }
    end

    render json: transactions
  end

  def by_product
    product_id = params[:product_id]
    transactions = Transaction.by_product(product_id).map do |transaction|
      {
        transaction: transaction,
        buyer_profile: BuyerProfile.find_by(user_id: transaction.user_id) || {}, 
        seller_profile: Profile.find_by(seller_id: transaction.seller_id) || {},    
        product_data: Product.find_by(id: transaction.product_id)
      }
    end

    render json: transactions
  end

  def content
    
  end

  # POST /transactions
  def create
    @transaction = @user.transactions.build(transaction_params)

    if @transaction.save
      render json: @transaction, status: :created, location: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /transactions/1
  def update
    if @transaction.update(transaction_params)
      render json: @transaction
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # DELETE /transactions/1
  def destroy
    @transaction.destroy!
  end

  private

  def set_transaction
    @transaction = Transaction.find(params[:id])
  end

  def set_current_user

    @user = User.find(params[:user_id])
  end

  def transaction_params
    params.require(:transaction).permit(:user_id, :product_id, :seller_id, :pending)
  end
end
