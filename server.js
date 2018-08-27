const express = require('express');
const mongoose = require('mongoose');
const app = express();

//DB config
const db = require('./config/keys').mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello chan uuuuuu'));

//左がtrueの場合は左が採用される
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
