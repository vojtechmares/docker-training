# base: one place to reference the base image
FROM node:22-alpine AS base

WORKDIR /app

# deps: install npm dependencies
FROM base AS deps

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM base AS prod-deps

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile --production

# build: build the application
FROM base AS build

ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules

COPY . .
RUN npm run build

# runtime: the final image, copy only what you need
FROM base AS runtime

EXPOSE 3000
ENV PORT=3000
ENV NODE_ENV=production

USER node

CMD ["node", "main.js"]

COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules

COPY --from=build --chown=node:node /app/build .
