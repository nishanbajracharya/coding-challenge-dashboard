import express from 'express';

const app = express();

const port = process.env.PORT;

app.get('/api', (req, res) => {
    res.json({
        status: 'success'
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});