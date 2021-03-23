const express = require('express');
const app = express();
const router = require('./route'); 


const PORT = process.env.PORT || 4000;

app.use('/api/data', function(req, res) {
    res.json({ greeting: 'Hello World' });
});
    

app.get('/', (req, res, next) => {
    res.send('Hello, Heroku!');
  });

const sequelize = require('./models').sequelize;
const bodyParser = require('body-parser');

sequelize.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/' , router);



app.listen(PORT, () => {
    
    console.log(`Server On : http://localhost:${PORT}/`);
}) 