class Profile < ApplicationRecord
  belongs_to :seller
  has_one_attached :image


  private

end
