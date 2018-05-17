import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Header =  ({ auth }) => {
    console.log('auth:', auth);
    const authBtn = auth ? (
        // <Link>标签并不会给服务器发请求，只用于前端路由指向的页面切换
        // 这里使用<a>标签是用于向服务器发请求
        <a href="/api/logout">Logout</a>
    ) : (
        <a href="/api/auth/google">Login</a>
    )
    return (
        <div>
            <Link to="/">React SSR</Link>
            <Link to="/admins">Admins</Link>
            { authBtn }
        </div>
    )
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);
