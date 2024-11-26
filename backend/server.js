import express from 'express';
import mongoose from 'mongoose';
import { postsRoutes } from './routes/postsRoutes.js';
import { usersRoutes } from './routes/usersRoutes.js';


const app = express();

app.use(express.json());

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);


mongoose.connect('mongodb://localhost:27017', { dbName: 'blossom_db' } )
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(4000, 'localhost', () => console.log('Server is running on http://localhost:4000'))
    })
    .catch((err) => console.log(err));

