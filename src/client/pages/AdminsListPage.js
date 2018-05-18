import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import adminsReducer from '../reducers/adminsReducer';

class AdminsList extends Component {
    componentDidMount() {
        this.props.fetchAdmins();
    }

    render() {
        return (
            <ul>
                { this.props.admins.map((admin) => <li key={admin.id}>{admin.name}</li>)}
            </ul>
        )
    }
}

const mapStateToProps = ({ admins }) => {
    return { admins };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAdmins: () => {
            dispatch(fetchAdmins());
        }
    }
}

export default {
    component: connect(mapStateToProps, { fetchAdmins })(AdminsList),
    loadData: (store) => { store.dispatch(fetchAdmins()) }
}