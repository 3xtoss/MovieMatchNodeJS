const express = require('express');
var path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname + '/about.html'));
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000')
});
