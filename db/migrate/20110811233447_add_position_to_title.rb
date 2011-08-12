class AddPositionToTitle < ActiveRecord::Migration
  def self.up
    add_column :pages, :title_x, :integer
    add_column :pages, :title_y, :integer
  end

  def self.down
    remove_column :pages, :title_x, :integer
    remove_column :pages, :title_y, :integer
  end
end
