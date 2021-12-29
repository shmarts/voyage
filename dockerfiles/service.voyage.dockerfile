FROM node:16-alpine
WORKDIR /usr/src/app

COPY . ./

RUN yarn workspaces focus @voyage/service.voyage

ENV PORT=80

RUN yarn workspace @voyage/service.voyage build

CMD ["node", "packages/service.voyage/dist"]