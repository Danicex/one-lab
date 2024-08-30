class AddSellerIdToInbox < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :seller_id, :integer
    add_column :inboxes, :buyer_id, :integer
  end
end
