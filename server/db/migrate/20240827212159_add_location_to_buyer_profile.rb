class AddLocationToBuyerProfile < ActiveRecord::Migration[7.1]
  def change
    add_column :buyer_profiles, :location, :string
    add_column :buyer_profiles, :address, :string
  end
end
