const express = require('express');
// Body Parser Import
const bodyparser = require('body-parser');

const app = express();

require('dotenv').config()

app.use(bodyparser.urlencoded({ extended: true })) // Adding support for form values
app.use(bodyparser.json({ extended: false })); // Adding support for JSON values
app.use(bodyparser.raw({ extended: false })) // Adding support for raw text values
app.use(express.urlencoded({ extended: false })) // Adding More support for form Values

// Import Routes
const authRoute = require('./routes/auth');
const clientRoute = require('./routes/clients');

// Route Middleware
app.use('/api/user', authRoute);
app.use('/all',clientRoute);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is up at port ${port}`))