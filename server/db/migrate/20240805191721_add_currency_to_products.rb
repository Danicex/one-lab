class AddCurrencyToProducts < ActiveRecord::Migration[7.1]
  def change
    add_column :products, :currency, :string
  end
end
