FROM node:carbon

WORKDIR /tmp

COPY package*.json /tmp/

RUN npm install

WORKDIR /irc-client/

COPY . /irc-client/

RUN cp -a /tmp/node_modules /irc-client/
