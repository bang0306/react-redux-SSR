import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';
import adminsReducer from '../reducers/adminsReducer';
import requireAuth from '../component/hocs/requireAuth';

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
    component: connect(mapStateToProps, { fetchAdmins })(requireAuth(AdminsList)),
    loadData: (store) => { store.dispatch(fetchAdmins()) }
}