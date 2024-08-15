class CreateBuyerProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :buyer_profiles do |t|
      t.string :name
      t.integer :phone_number
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
