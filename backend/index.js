import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import Task from './api/todo/models'
import todoRoutes from './api/todo/routes'
const app = express(), port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tododb', {useNewUrlParser: true, useUnifiedTopology: true});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

todoRoutes(app);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);


console.log('Sky-net on:' + port);
