import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/api', (req, res) => {
    res.json({
        status: 'success'
    });
});

app.get('/', (req, res) => {
    res.render('home');
});


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});