# ---------- 1: Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps

COPY . .
RUN npm run build

# ---------- 2: Production Stage ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV START_PROXY=false

COPY package.json package-lock.json* ./
RUN npm ci --legacy-peer-deps --omit=dev

COPY --from=builder /app/dist /app/dist
COPY cors-proxy /app/cors-proxy
COPY server.js /app/server.js

EXPOSE 3000
CMD ["node", "server.js"]
