import express from "express";
// const cors = require('cors');
import cors from 'cors'
const app = express();

app.use(cors({origin: '*'}));


app.get('/hello', async (req, res) => {
    res.status(200).json({ message: 'API Working Fine' }) 
});



app.listen(5000, () => {
    console.log('Server running on PORT: 5000')
});