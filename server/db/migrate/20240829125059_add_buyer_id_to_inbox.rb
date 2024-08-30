class AddBuyerIdToInbox < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :buyer_id, :integer
  end
end
