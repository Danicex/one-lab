class Transaction < ApplicationRecord

  belongs_to :user, class_name: 'User', foreign_key: 'user_id'
  
  belongs_to :product

  # Assuming the buyer has a profile
  has_one :buyer_profile, through: :buyer, source: :profile
  
  def buyer_profile
    user.buyer_profile
  end

  scope :by_seller, ->(seller_id) {
    where(seller_id: seller_id)
  }
  scope :by_product, ->(product_id) {
    where(product_id: product_id)
  }
  
  has_one :buyer_profile, through: :seller
end