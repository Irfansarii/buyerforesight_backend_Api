import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

// Sabhi user related routes ko /users prefix ke sath use karein
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});