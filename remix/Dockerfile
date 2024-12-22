FROM node:20-slim

WORKDIR /remix

COPY package*json .
RUN npm install
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
