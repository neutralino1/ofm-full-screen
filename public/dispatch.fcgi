#!/usr/bin/ruby
require File.dirname(__FILE__) + "/../config/environment"
require 'fcgi_handler'

class RailsFCGIHandler
  private
  def fix_handler(signal)
    dispatcher_log :info, "asked to terminate immediately"
    dispatcher_log :info, "fix handler working its magic!"
    restart_handler(signal)
  end
  alias_method :exit_now_handler, :fix_handler
end

RailsFCGIHandler.process! nil, 10
  
