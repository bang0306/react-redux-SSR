import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';

export default (req, store, context) => {
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
                <div>
                    {renderRoutes(Routes)}
                </div>
            </StaticRouter>
        </Provider>
        );
    const initStateStr = serialize(store.getState());
    const html = `
        <html>
            <head></head>
            <body>
                <div id="root">${content}</div>
                <script>window.INIT_STATE = ${initStateStr}</script>
                <script type="text/javascript" src="bundle.js"></script>
            </body>
        </html>
    `;
    return html;
}