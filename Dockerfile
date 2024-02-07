FROM node:18-slim

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . .

COPY .env ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start", "--host", "0.0.0.0"]
