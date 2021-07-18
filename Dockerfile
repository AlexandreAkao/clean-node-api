FROM node:14
WORKDIR /usr/src/clean-node-api
ENV NODE_ENV=production
COPY ./package.json .
RUN npm install --production --silent
COPY ./dist ./dist
EXPOSE 5000
CMD npm start
