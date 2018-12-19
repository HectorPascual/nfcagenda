require 'net/http'
require 'json'
require 'gtk3'

module HttpRequest

  def HttpRequest.get(url, handler)
    puts "Entro en el http"
    res = Net::HTTP.get_response(URI(url))
    puts res
    if(res.kind_of? Net::HTTPSuccess)
      begin
        jsonObject=JSON.parse(res.body)
        GLib::Idle.add do
    			handler.call(jsonObject)
    			GLib::Source::REMOVE
    		end
      rescue
        GLib::Idle.add do
    			handler.call
    			GLib::Source::REMOVE
    		end

      end
    end
  end
end
