const express = require('express');
const app = express();
const router = require('./route'); 
const proxy = require("http-proxy-middelware");

const PORT = process.env.PORT || 5000;
const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();


app.use(proxy("/api/greeting", { target: "http://localhost:5000" }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/' , router);

app.get("/api/greeting", (req, res) => {
    res.send("Hello World!");
});


app.listen(PORT, () => {
    
    console.log(`Server On : http://localhost:${PORT}/`);
}) 