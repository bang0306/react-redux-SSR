import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

export default [
    {
        ...App,
        routes: [
            {
                path: '/',
                ...HomePage,
                exact: true
            },
            {
                path: '/users',
                ...UsersListPage
            },
            {
                path: '/admins',
                ...AdminsListPage
            },
            {
                // 不定义path，如果其他Route没有Match上，就Match这个
                ...NotFoundPage
            }
        ]
    }
]