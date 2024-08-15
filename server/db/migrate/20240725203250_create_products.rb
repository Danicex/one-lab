class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :category
      t.integer :price
      t.string :description
      t.string :delivery_time
      t.integer :quantity
      t.references :seller, null: false, foreign_key: true

      t.timestamps
    end
  end
end
