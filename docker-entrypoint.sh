#!/bin/sh
set -e

# Run Prisma migrations
npx prisma migrate deploy

# Start the Nuxt application
exec node /app/.output/server/index.mjs