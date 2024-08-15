class DropProfilesTable < ActiveRecord::Migration[7.1]
  def up
    drop_table :profiles
  end

  def down
    create_table :profiles do |t|
      t.string :fullname
      t.string :phone_number
      t.string :address
      t.string :bank_name
      t.string :account_number
      t.string :bank_code
      t.string :currency

      t.timestamps
    end
  end
end
