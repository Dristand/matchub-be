FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Un-Comment for production
# RUN npm ci --only=production
# RUN npm i -g @nestjs/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:dev"]