# Build Stage 1
FROM node:14.13.1-alpine AS builder

WORKDIR /var/www/appNode

COPY app/package.json .

RUN npm set progress=false && \
    npm config set depth 0 && \
    npm i


# Build Stage 2
FROM node:14.13.1-alpine

WORKDIR /var/www/appNode

COPY --from=builder /var/www/appNode/node_modules /var/www/appNode/node_modules

COPY ./app /var/www/appNode

RUN chown -R node.node /var/www/appNode

RUN npm i -g knex

USER node
# Run production
ENTRYPOINT ["npm", "run", "prod"]

EXPOSE 3000
