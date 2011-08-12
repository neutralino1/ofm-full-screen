# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110812203147) do

  create_table "pages", :force => true do |t|
    t.integer  "user_id"
    t.integer  "track_id",      :null => false
    t.string   "facebook"
    t.string   "twitter"
    t.string   "myspace"
    t.string   "custom"
    t.string   "website"
    t.boolean  "public"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "title_x"
    t.integer  "title_y"
    t.string   "title_font"
    t.string   "artist_font"
    t.string   "title_colour"
    t.string   "artist_colour"
  end

  add_index "pages", ["custom"], :name => "index_pages_on_custom", :unique => true
  add_index "pages", ["user_id"], :name => "index_pages_on_user_id"

  create_table "users", :force => true do |t|
    t.string   "login",                     :limit => 40
    t.string   "name",                      :limit => 100, :default => ""
    t.string   "email",                     :limit => 100
    t.string   "crypted_password",          :limit => 40
    t.string   "salt",                      :limit => 40
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "remember_token",            :limit => 40
    t.datetime "remember_token_expires_at"
  end

  add_index "users", ["login"], :name => "index_users_on_login", :unique => true

end
