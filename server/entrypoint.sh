#!/bin/sh
set -e

# npm run db:create --prefix server
npm run db:migrate --prefix server
npm run db:seed --prefix server
npm run start:prod --prefix server

exec "$@"
