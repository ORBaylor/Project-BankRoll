import express from 'express';
import { connect } from 'mongoose';

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connect('mongodb://localhost:27017/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// Define routes and middleware here

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

