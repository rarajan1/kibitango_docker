FROM node:16-bullseye-slim

ENV NODE_ENV producition
ENV NUXT_DATABASE_HOST localhost
ENV NUXT_DATABASE_USER kibitango
ENV NUXT_DATABASE_PASSWORD kibitango
ENV NUXT_DATABASE_NAME kibitango
ENV NUXT_JWT_SECRET secret

WORKDIR /home/app
COPY package.json package-lock.json ./
COPY .output ./.output

CMD "npm" "run" "start"