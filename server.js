'use strict';

const express = require("express");

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();

app.post('/',( req, res) => {
  res.json({"order": "items" });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

module.exports = app