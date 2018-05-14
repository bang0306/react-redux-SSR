import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';

const app = express();
app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore();
    const promises = matchRoutes(Routes, req.path).map(({route}) => typeof route.loadData === 'function' ? route.loadData(store) : null);
    Promise.all(promises).then(() => {
        const html = renderer(req, store);
        res.send(html);
    })
})

app.listen(3001, () => {
    console.log('listening on port 3000');
})