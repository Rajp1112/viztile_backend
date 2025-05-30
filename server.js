require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./router/auth-router');
const connectDb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const adminRoute = require('./router/admin-router');
const movieRoute = require('./router/movie-router');
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  methods: 'GET, PUT, POST, DELETE, PATCH',
  Credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);
app.use('/api/admin', adminRoute);
app.use('/api', movieRoute);
app.use(errorMiddleware);

const args = require('minimist')(process.argv.slice(2));

const host = args.host || 'localhost';
const PORT = args.port || 5000;

console.log(`Server is running on host: ${host}`);
console.log(`Server is running on port: ${PORT}`);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
