class Product < ApplicationRecord
   belongs_to :seller
  has_one_attached :image
  has_many :transactions

  scope :recent, -> { order(created_at: :desc) }
  scope :by_category, ->(category) { where(category: category).order(created_at: :desc) }
  
  scope :search_by_name_or_description, ->(query) {
    where('name LIKE ? OR description LIKE ?', "%#{query}%", "%#{query}%")
  }
end
