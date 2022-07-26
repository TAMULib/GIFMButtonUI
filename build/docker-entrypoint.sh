#!/bin/sh
# Requires: envsubst, head, sed, tail.

set -e

printenv

echo "Templating /etc/nginx/conf.d/default.conf"
envsubst < /usr/local/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
echo "Done"
head -n -0 /etc/nginx/conf.d/default.conf

echo "Templating /usr/share/nginx/html/appConfig.js"
envsubst < /usr/local/app/templates/appConfig.js.template > /usr/share/nginx/html/appConfig.js
echo "Done"
head -n 20 /usr/share/nginx/html/appConfig.js

echo "Setting index base href to '$BASE_PATH'."
sed -i -e "s|<base href=\"[^\"]*\"|<base href=\"$BASE_PATH/\"|" /usr/share/nginx/html/index.html
head -n 10 /usr/share/nginx/html/index.html

echo "Setting index google analytics key to to '$GOOGLE_ANALYTICS'."
sed -i 's|UA-XXXXX-X|'"$GOOGLE_ANALYTICS"'|g' /usr/share/nginx/html/index.html
tail -n 10 /usr/share/nginx/html/index.html

echo "Done docker-entrypoint..."

exec "$@"
