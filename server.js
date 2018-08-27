const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello chan uuuuuu'));

//左がtrueの場合は左が採用される
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));
