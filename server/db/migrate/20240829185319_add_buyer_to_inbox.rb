class AddBuyerToInbox < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :buyer, :boolean
  end
end
