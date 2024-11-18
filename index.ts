import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';

import router from './routes';
import { viewAuth } from './middlewares/auth';

const app = express();

app.use(cookieParser());

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api', router);

app.get('/', viewAuth, (req, res) => {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
})

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
