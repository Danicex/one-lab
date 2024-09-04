class AddImageUrlToInbox < ActiveRecord::Migration[7.1]
  def change
    add_column :inboxes, :image_url, :string
    add_column :inboxes, :audio_url, :string
    add_column :inboxes, :video_url, :string
  end
end
