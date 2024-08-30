class Message < ApplicationRecord
    scope :buyer_message, -> (buyer_id) {where(buyer_id: buyer_id).order(created_at: :desc)}
    
    scope :seller_message, -> (seller_id) {where(seller_id: seller_id).order(created_at: :desc)}
    
end
