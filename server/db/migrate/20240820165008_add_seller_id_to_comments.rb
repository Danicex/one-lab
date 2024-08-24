class AddSellerIdToComments < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :seller_id, :integer
  end
end
