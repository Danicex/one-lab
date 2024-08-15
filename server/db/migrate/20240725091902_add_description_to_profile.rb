class AddDescriptionToProfile < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :description, :text
  end
end
