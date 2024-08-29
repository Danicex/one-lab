class Product < ApplicationRecord
   belongs_to :seller
  has_one_attached :image
  has_many :transactions

  scope :all_products, -> { order(created_at: :desc) }
  scope :by_category, ->(category) { where(category: category).order(created_at: :desc) }
  scope :by_seller, ->(seller_product) { where(seller_id: seller_id).order(created_at: :desc) }
  scope :search, ->(query) { where('name LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%") }
end
