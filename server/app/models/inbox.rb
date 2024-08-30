class Inbox < ApplicationRecord

    scope :sellerchat, ->(seller_id, buyer_id) {
    where(seller_id: seller_id, buyer_id: buyer_id)
  }
  scope :buyerchat, ->(buyer_id, seller_id) {
    where(buyer_id: buyer_id, seller_id: seller_id)
  }


end
