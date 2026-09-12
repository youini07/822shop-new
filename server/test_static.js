const express = require('express');
const app = express();
const path = require('path');
const staticPath = path.resolve(__dirname, '..', 'static');
console.log('Serving from:', staticPath);
app.use('/static', express.static(staticPath));
app.listen(5001, () => console.log('Listening on 5001'));
