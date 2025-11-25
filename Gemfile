source "https://rubygems.org"

# 1. Jekyll Upgrade
# Wir gehen auf Version 3.9.x. Das ist die aktuelle Version, die GitHub Pages nutzt.
# Deine alte 3.7.4 ist zu alt für deinen neuen Mac.
gem "jekyll", "~> 3.9.0"

# --- DER FIX ---
# Wir laden EventMachine direkt vom Entwickler-Code (Master Branch),
# weil dort der Fix für Apple Silicon / Xcode 16 schon drin ist.
gem "eventmachine", git: "https://github.com/eventmachine/eventmachine.git"

# 2. Die "Mac Silicon Fixes"
# Diese Zeilen sind der Schlüssel! Sie erzwingen moderne Versionen der Hilfs-Tools,
# die mit deinem M1/M2/M3 Prozessor und Xcode 16 klarkommen.
gem "webrick"
gem "http_parser.rb", ">= 0.8.0"

# 3. Deine Plugins
# Da wir das strikte "github-pages" Paket oben entfernt haben (um die Fehler zu umgehen),
# müssen wir deine Plugins hier explizit auflisten.
group :jekyll_plugins do
  gem "jekyll-sitemap"
  gem "jekyll-redirect-from"
end

# 4. Deine Design-Tools (Bourbon/Neat)
# Wir behalten sie bei, damit dein Layout genau gleich aussieht.
gem "sass"
gem "bourbon"
gem "neat"

