const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const pathToFile = path.join(__dirname, 'countFile.json'); 

const data = JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));

let counter = data.urlIndex;
let countAbout = data.urlAbout;

app.get('/', (req, res) => {
  res.send(`<h1>Главная страница</h1> 
  <a href="/about">Обо мне</a>
  <div>Просмотров: ${counter++}</div>`);
  data.urlIndex = counter;
  fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2)); 
})

app.get('/about', (req, res) => {
  res.send(`<h1>Страница обо мне</h1>
   <a href="/">Главная страница</a>
   <div>Просмотров: ${countAbout++}</div>`);
   data.urlAbout = countAbout;
   fs.writeFileSync(pathToFile, JSON.stringify(data, null, 2));
})

app.listen(3000);

//  npm init -y
//  npm i express 
//  node ./index.js