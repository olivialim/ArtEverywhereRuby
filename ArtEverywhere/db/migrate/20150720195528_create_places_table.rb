class CreatePlacesTable < ActiveRecord::Migration
  def change
      create_table :places do |t|
        t.string :neighborhood
        t.string :citystate
        t.string :artist
        t.string :title
        t.string :description
        t.string :image_url
        t.datetime :created_at
        t.integer :user_id
      end
  end
end
