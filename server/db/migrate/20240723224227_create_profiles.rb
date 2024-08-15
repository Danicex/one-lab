class CreateProfiles < ActiveRecord::Migration[7.1]
  def change
    create_table :profiles do |t|
      t.string :fullname
      t.string :phone_number
      t.string :address
      t.string :bank_name
      t.string :account_number
      t.string :bank_code
      t.string :currency
      t.references :seller, null: false, foreign_key: true

      t.timestamps
    end
  end
end
