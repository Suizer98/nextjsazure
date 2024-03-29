#!/bin/sh

set -e
service ssh start

# Export environment variables from the outer container to the inner one
eval $(printenv | sed -n "s/^\([^=]\+\)=\(.*\)$/export \1=\2/p" | sed 's/"/\\\"/g' | sed '/=/s//="/' | sed 's/$/"/' >> /etc/profile)

# Create .env file and edit it with Nano
printenv > .env

echo "Running in development mode"
exec npm run dev
