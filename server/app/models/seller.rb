class Seller < ApplicationRecord
       
 has_one :profile, dependent: :destroy
 accepts_nested_attributes_for :profile
 has_many :products
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api

end
