// import axios from 'axios';
import cookieParser from 'cookie-parser';
import express from 'express';
// import fs from 'fs';
import path from 'path';
// import uuid from 'uuid/v4';

const PORT = typeof process.env.PORT === 'undefined' ? 7777 : process.env.PORT;

const app = express();

app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../../static')));
app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, () => {
  console.log(`Your app is listening on port ${PORT}`);
});
