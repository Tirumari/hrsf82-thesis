const express = require('express');
const path = require('path');


const app = express();
app.use(express.static(path.join(__dirname, '../client/dist/')));

// app.put('/test', function (req, res) {
//   console.log('put request received!');
//   console.log(req);
//   res.send('put request received!');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`Listening on port ${PORT}`); });