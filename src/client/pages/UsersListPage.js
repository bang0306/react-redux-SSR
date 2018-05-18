import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { fetchUsers } from '../actions';

class UsersList extends Component {
    
    componentDidMount() {
        this.props.fetchUsers();
    }

    renderHeaders() {
        return (
            <Helmet>
                <title>{`${this.props.users.length} users loaded`}</title>
                <meta property="og:title" content="a list of titles" />
            </Helmet>
        )
    }

    render() {
        return (
            <div>
                { this.renderHeaders() }
                <ul>
                    {this.props.users.map((user) => <li key={user.id}>{user.name}</li>)}
                </ul>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsers: () => {
            dispatch(fetchUsers());
        }
    }
}

const mapStateToProps = (state) => {
    return {users: state.users}
};

export const loadData = (store) => {
    return store.dispatch(fetchUsers())
}

export default {
    component: connect(mapStateToProps, {fetchUsers})(UsersList),
    loadData
}