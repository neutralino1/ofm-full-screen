module ApplicationHelper
  def truncate_start(str, length)
    lgt = str.length
    if lgt > length
      return str[(lgt-length)..-1]
    end
    str
  end
end
