class AddFileToInbox < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :file, :boolean
  end
end
