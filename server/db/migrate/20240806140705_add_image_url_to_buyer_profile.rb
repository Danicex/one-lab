class AddImageUrlToBuyerProfile < ActiveRecord::Migration[7.1]
  def change
    add_column :buyer_profiles, :image_url, :string
  end
end
