class AddCountryToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :country, :string
    add_column :profiles, :website, :string
    add_column :profiles, :social, :string
  end
end
