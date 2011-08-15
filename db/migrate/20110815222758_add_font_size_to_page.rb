class AddFontSizeToPage < ActiveRecord::Migration
  def self.up
    add_column :pages, :title_size, :integer
    add_column :pages, :artist_size, :integer
  end

  def self.down
    remove_column :pages, :title_size, :integer
    remove_column :pages, :artist_size, :integer
  end
end
