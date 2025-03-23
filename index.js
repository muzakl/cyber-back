import express from "express";
import cors from "cors";
import {connectToDatabase} from "./services/database.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/menus/navbarItems', async (req, res) => {
    async function run() {
        try {
            const database = await connectToDatabase();
            const navbarItems = database.collection('navbarItems');
            const cursor = navbarItems.find();
            const result = await cursor.toArray()
            res.json(result);
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    run().catch(console.dir);
});

app.get('/menus/categoryItems', async (req, res) => {
    async function run() {
        try {
            const database = await connectToDatabase();
            const categoryItems = database.collection('categoryItems');
            const cursor = categoryItems.find();
            const result = await cursor.toArray()
            res.json(result);
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }

    run().catch(console.dir);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});