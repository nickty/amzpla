require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

// DB Connection
require('./config/db')

// Middleware
app.use(cors({ exposedHeaders: ['X-Total-Count', 'Content-Range'] }))
app.use(bodyParser.json())
app.use(morgan('dev'))
// app.use("/", (req, res) => {
//   res.send("Hello user");
// });

// Routes
app.use('/api/auth', require('./api/routes/authRoutes'))
app.use('/api/products', require('./api/routes/productRoutes'))
app.use('/api/users', require('./api/routes/userRoutes'))

console.log('love for Allah')

// Error Handling Middleware
// app.use(require("./api/middlewares/errorHandler"));

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
