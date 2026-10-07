FROM node:24@sha256:3d27e5c11e5786e309ec3e03f93ae536eb36e6e5eb3714d5eb3300a36157add0

WORKDIR /usr/src/rest

# Install dependencies first
COPY package*.json ./
RUN npm install --unsafe-perm

COPY . .

ARG PORT=3000
ENV PORT $PORT

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG API_URL=https://api-staging.opencollective.com
ENV API_URL $API_URL

ARG API_KEY=09u624Pc9F47zoGLlkg1TBSbOl2ydSAq
ENV API_KEY $API_KEY

RUN npm run build

RUN npm prune --production

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]
