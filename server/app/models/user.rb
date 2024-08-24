class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_one :buyer_profile
  has_many :transactions
  has_many :comments
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api

end
