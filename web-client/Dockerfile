FROM node:4-onbuild

RUN mkdir -p /usr/src/web-client
WORKDIR /usr/src/web-client

COPY . /usr/src/web-client

RUN npm install

EXPOSE 6088
CMD [ "npm", "start" ]
