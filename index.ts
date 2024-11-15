import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import { engine } from 'express-handlebars';

import router from './routes';

const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api', router);

app.get('/', (req, res) => {
    res.render('home');
});

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});