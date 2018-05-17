import React from 'react';
import Routes from './Routes';
import { renderRoutes } from 'react-router-config';
import Header from './component/Header';
import { fetchCurrentUser } from './actions';

const App = ({ route }) => {
    return (
        <div>
            <Header />
            { renderRoutes(route.routes) }
        </div>
    )
}

export default {
    component: App,
    loadData: ({ dispatch}) => dispatch(fetchCurrentUser())
};