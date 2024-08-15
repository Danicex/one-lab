class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :product_id
      t.integer :seller_id
      t.boolean :pending

      t.timestamps
    end
  end
end
