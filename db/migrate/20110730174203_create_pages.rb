class CreatePages < ActiveRecord::Migration
  def self.up
    create_table 'pages' do |t|
      t.references :user
      t.integer :track_id, :null => false
      t.string :facebook
      t.string :twitter
      t.string :myspace
      t.string :custom
      t.boolean :public
      t.timestamps
    end
    add_index :pages, :user_id
    add_index :pages, :custom, :unique => true
  end

  def self.down
    drop_table 'pages'
  end
end
