FROM node:alpine as BUILD_IMAGE
WORKDIR /app

COPY package.json package-lock.json ./
# install dependencies
RUN npm install --frozen-lockfile
COPY . .
# build
RUN npm run build
# remove dev dependencies
RUN npm prune --production
FROM node:alpine
WORKDIR /app
# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
EXPOSE 3000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

CMD if [ "$NODE_ENV" = "production" ]; \
then npm run start; \
else npm run dev; \
fi
