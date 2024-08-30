class AddBuyerIdToMessage < ActiveRecord::Migration[7.1]
  def change
    add_column :messages, :buyer_id, :integer
  end
end
