class CreateComments < ActiveRecord::Migration[7.1]
  def change
    create_table :comments do |t|
      t.references :products, null: false, foreign_key: true
      t.string :body
      t.integer :user_id

      t.timestamps
    end
  end
end
