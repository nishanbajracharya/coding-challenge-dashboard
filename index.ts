import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';

import router from './routes';
import { viewAuth } from './middlewares/auth';

const app = express();

app.use(morgan('tiny'));

app.use(cookieParser());

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api', router);

app.get('/', viewAuth, (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
