FROM node:4-onbuild

# RUN mkdir -p /usr/src/web-client
# WORKDIR /usr/src/web-client

# COPY package.json .
# RUN npm install --production
# COPY . .

EXPOSE 6088
CMD npm run build-client && npm start
