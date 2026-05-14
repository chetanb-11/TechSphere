import app from './app';
import { connectToDatabase } from './config/db';

const PORT = process.env.PORT || 3001;

async function startServer() {
    try {
        await connectToDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server due to DB connection error:', error);
        process.exit(1);
    }
}

startServer();
