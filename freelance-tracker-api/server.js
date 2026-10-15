const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); 
app.use(helmet()); 
app.use(cors()); 
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); 
}

const auth = require('./routes/authRoutes');
const projects = require('./routes/projectRoutes');
const analytics = require('./routes/analyticsRoutes');

app.use('/api/v1/auth', auth);
app.use('/api/v1/projects', projects);
app.use('/api/v1/analytics', analytics);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
});