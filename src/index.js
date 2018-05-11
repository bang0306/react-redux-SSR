import express from 'express';
import renderer from './helpers/renderer';

const app = express();
app.use(express.static('public'));
app.get('*', (req, res) => {
    const html = renderer(req);
    res.send(html);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})