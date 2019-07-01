FROM node:10.14.2
COPY ./package.json /app/
WORKDIR /app
RUN npm install
COPY . .
EXPOSE 8080
CMD ["node","/app/app.js"]
