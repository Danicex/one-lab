class Inbox < ApplicationRecord
    scope :by_buyer, -> (buyer_id) { where(:buyer_id => buyer_id)}
    
end
