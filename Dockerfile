# https://markus.oberlehner.net/blog/running-nuxt-3-in-a-docker-container/
# https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running

# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.18.0
# ARG PORT=3000

# Use an official Node runtime as the base image
FROM node:${NODE_VERSION}-alpine AS base

WORKDIR /app

# Install dependencies
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# Build stage
FROM base AS builder
COPY --from=deps --link /app/node_modules ./node_modules
COPY --link . .

# Generate Prisma client
RUN npx prisma generate

# Build the Nuxt application
RUN npm run build

# Production stage
FROM base AS runner

# Set environment to production
# ENV PORT=3000
ENV NODE_ENV=production

# Create a non-root user for security
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nuxtuser -u 1001

# Copy built application and node_modules
COPY --from=builder /app/.output ./.output
# Optional, only needed if you rely on unbundled dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

# Copy entrypoint script
COPY --chmod=755 docker-entrypoint.sh /docker-entrypoint.sh

# Ensure correct permissions
# RUN chown -R nuxtuser:nodejs /app

# Switch to non-root user
# USER nuxtuser

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
# CMD ["node", "/app/.output/server/index.mjs"]
ENTRYPOINT ["/docker-entrypoint.sh"]
