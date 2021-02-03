const express = require('express');
const app = express();
const router = require('./route'); 

const cors = require('cors');

const PORT = process.env.PORT || 4000;
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/' , router);


app.listen(PORT, () => {
    
    console.log(`Server On : http://localhost:${PORT}/`);
}) 