class Comment < ApplicationRecord

  scope :by_seller, ->(seller_id) {
    where(seller_id: seller_id).order(created_at: :desc)
  }
end
