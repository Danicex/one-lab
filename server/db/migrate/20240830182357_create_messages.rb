class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.integer :seller_id
      t.integer :inbox_id

      t.timestamps
    end
  end
end
