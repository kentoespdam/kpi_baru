# # 1. Install dependencies only when needed
FROM node:18-alpine AS deps

# ENV NODE_ENV=production

# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3

WORKDIR /app

# # Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN yarn install
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# #Rebuild th source code only when needed
FROM node:18-alpine AS builder

RUN apk add --no-cache libc6-compat
RUN apk add --no-cache python3

# ENV NODE_ENV=production

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY ./public ./public
COPY ./.next ./.next

# build .next
# RUN yarn build

# Production image, copy all the files and run next
FROM deps AS runner
WORKDIR /app

ENV NODE_ENV=production

# create nextjs user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --chown=nextjs:nodejs ./.env ./.env
COPY --chown=nextjs:nodejs ./package.json ./package.json
COPY --chown=nextjs:nodejs ./next-env.d.ts ./next-env.d.ts
COPY --chown=nextjs:nodejs ./next.config.js ./next.config.js
COPY --chown=nextjs:nodejs ./tsconfig.json ./tsconfig.json
COPY --chown=nextjs:nodejs ./yarn.lock ./yarn.lock

USER nextjs

# #expose node port
EXPOSE 3002

# #set env port
ENV PORT 3002

# #run server.js
CMD ["yarn", "start"]