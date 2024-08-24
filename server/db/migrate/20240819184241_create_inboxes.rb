class CreateInboxes < ActiveRecord::Migration[7.1]
  def change
    create_table :inboxes do |t|
      t.text :content

      t.timestamps
    end
  end
end
