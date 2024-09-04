class AddDesignerToProfiles < ActiveRecord::Migration[7.1]
  def change
    add_column :profiles, :designer, :boolean
  end
end
