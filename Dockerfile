# ---------- 1️⃣ Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first (better caching)
COPY package.json package-lock.json* ./

# Clean install dependencies
RUN npm ci --legacy-peer-deps

# Copy rest of the project
COPY . .

# Build Vite app
RUN npm run build


# ---------- 2️⃣ Production Stage ----------
FROM nginx:alpine

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy Vite build output (Vite builds into dist/)
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]