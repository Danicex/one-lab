class AddStoreNameToProfile < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :store_name, :string
  end
end
