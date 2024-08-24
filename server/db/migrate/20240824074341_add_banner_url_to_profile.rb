class AddBannerUrlToProfile < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :banner_url, :string
  end
end
