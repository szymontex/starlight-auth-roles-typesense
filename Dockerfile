# Etap 1: Budowanie aplikacji
FROM node:18-alpine AS builder

# Instalacja pnpm globalnie
RUN npm install -g pnpm

# Ustawienie katalogu roboczego
WORKDIR /app

# Skopiowanie plików konfiguracyjnych pnpm i pliku package.json
COPY package.json pnpm-lock.yaml ./

# Instalacja zależności produkcyjnych
RUN pnpm install --frozen-lockfile

# Skopiowanie reszty kodu źródłowego
COPY . .

# Budowanie aplikacji Astro
RUN pnpm build

# Etap 2: Uruchomienie aplikacji
FROM node:18-alpine

# Instalacja pnpm globalnie
RUN npm install -g pnpm

# Ustawienie katalogu roboczego
WORKDIR /app

# Skopiowanie zależności produkcyjnych z etapu budowania
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Skopiowanie zbudowanej aplikacji z etapu budowania
COPY --from=builder /app/dist ./dist

# Eksponowanie portu aplikacji
EXPOSE 3000

# Domyślna komenda uruchamiająca aplikację
CMD ["node", "./dist/server/entry.mjs"]
