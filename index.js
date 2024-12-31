const express = require('express');
const app = express();
const cors = require('cors');
const { connectDB } = require('./db/db');
const { port } = require('./config/config'); 

const postRoutes  = require('./routes/postRoutes');

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use('/posts', postRoutes)
//

app.get('/', (req, res) => {
    res.send('PostPeaks server running here.');
})

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`server running on port ${port}`)
    })
})
