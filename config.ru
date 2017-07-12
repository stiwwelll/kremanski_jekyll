require 'rack/jekyll'
require 'rack/rewrite'

use Rack::Rewrite do

  send_file /^\/?(.+\.(?:ico|jpg|jpeg|png|gif))$/,
          '_site/$1',
          :headers => lambda { { 'Expires' => (Date.today+365).httpdate } }


  # Jekyll
  # rewrite paths without .html /about to /about.html (jekyll builds these)
  # ...but ony if it doesn't exist
  rewrite %r{^([^.]+[^/])$}, '$1.html', :if => Proc.new { |rack_env|
    req = Rack::Request.new(rack_env)
    !File.exists?("./_site/#{req.path}")
  }

end

run Rack::Jekyll.new
