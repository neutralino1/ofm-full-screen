class CreatePages < ActiveRecord::Migration
  def self.up
    create_table 'pages' do |t|
      t.references :user
      t.integer :track_id, :null => false
      t.timestamps
    end
    add_index :pages, :user_id
  end

  def self.down
    drop_table 'pages'
  end
end
