class AddImageUrlToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :image_url, :string
  end
end
