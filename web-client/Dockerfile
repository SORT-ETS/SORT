FROM node:4-onbuild

RUN mkdir -p /usr/src/web-client
WORKDIR /usr/src/web-client

COPY package.json /usr/src/web-client
RUN npm install

COPY . /usr/src/web-client

EXPOSE 3000
CMD [ "npm", "start" ]
