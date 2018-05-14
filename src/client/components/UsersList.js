import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';

class UsersList extends Component {
    
    componentDidMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <ul>
                {this.props.users.map((user) => <li key={user.id}>{user.name}</li>)}
            </ul>
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

export default connect(mapStateToProps, {fetchUsers})(UsersList);