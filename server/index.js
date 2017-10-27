const express = require('express');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, '../client/dist/')));

app.get('/test', function (req, res) {
  res.send('get request received!');
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });