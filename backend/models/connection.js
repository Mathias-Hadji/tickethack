const mongoose = require('mongoose');

const connectString = process.env.CONNECTION_STRING;

mongoose.connect(connectString,{connectTimeoutMS:2000})
.then(() => console.log('Data connected'))
.catch(error => console.error(error));