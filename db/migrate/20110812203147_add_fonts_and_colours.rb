class AddFontsAndColours < ActiveRecord::Migration
  def self.up
    change_table :pages do |t|
      t.string :title_font
      t.string :artist_font
      t.string :title_colour
      t.string :artist_colour
    end
  end

  def self.down
    remove_column :pages, :title_font, :string
    remove_column :pages, :artist_font, :string
    remove_column :pages, :title_colour, :string
    remove_column :pages, :artist_colour, :string
  end
end
