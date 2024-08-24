class Profile < ApplicationRecord
  belongs_to :seller
  has_one_attached :image
  has_one_attached :banner

  private

end
