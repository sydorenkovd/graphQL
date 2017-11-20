// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import { getList } from './api/actions'
import Loading from '../common/Loading'
import Item from './Item'

// Component
class List extends Component {

    componentDidMount() {
        this.props.getList()
    }

    render() {
        return(
            <div>
                <h1>Users</h1>

                <p>
                    <Link to={ routes.users.create }>Create</Link>
                </p>

                {/* List users */}
                {
                    this.props.users.isLoading
                        ?
                    <Loading message="loading users..." />
                        :
                    (
                        this.props.users.list.length > 0
                            ?
                        <ul>
                            { this.props.users.list.map(user => (
                                <li key={ user.id }>
                                    <Item user={ user } />
                                </li>
                            )) }
                        </ul>
                            :
                        <p>No users to show.</p>
                    )
                }
            </div>
        )
    }
}

// Component Properties
List.propTypes = {
    users: PropTypes.object.isRequired,
    getList: PropTypes.func.isRequired,
}

// Component State
function usersState(state) {
    return {
        users: state.users
    }
}

export default connect(usersState, { getList })(List)