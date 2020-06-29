const express = require('express');

const app = express();


const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is up at port ${port}`))