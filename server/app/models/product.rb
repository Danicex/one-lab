class Product < ApplicationRecord
   belongs_to :seller
  has_one_attached :image
  has_many :transactions

  
end
