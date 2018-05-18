import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';

const app = express();
app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
        opts.headers['x-forwarded-host'] = 'localhost:3000';
        return opts;
    }
}))
app.use(express.static('public'));
app.get('*', (req, res) => {
    const store = createStore(req);
    const promises = matchRoutes(Routes, req.path)
                    .map(({route}) => typeof route.loadData === 'function' ? route.loadData(store) : null)
                    .map((promise) => {
                        if (promise) {
                            return new Promise((resolve, reject) => {
                                promise.then(resolve).catch(resolve);
                            })
                        }
                    });

    Promise.all(promises).then(() => {
        const context = {};
        const html = renderer(req, store, context);
        // console.log('context', context);
        if (context.url) {
            // console.log('redirect', context.url)
            return res.redirect(301, context.url);
        }
        if (context.notFound) {
            res.status(404);
        }
        res.send(html);
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})