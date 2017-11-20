// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import { get } from './api/actions'
import Loading from '../common/Loading'

// Component
class View extends Component {

    componentDidMount() {
        this.props.get(this.props.match.params.id)
    }

    render() {
        return(
            <div>
                <h1>User</h1>

                <p>
                    <Link to={ routes.users.list }>Back</Link>
                </p>

                {/* Single users */}
                {
                    this.props.user.isLoading
                        ?
                    <Loading message="loading user details..." />
                        :
                    (
                        this.props.user.item.id > 0
                            ?
                        <div>
                            <h1>"{ this.props.user.item.email }"</h1>
                            <h4> - { this.props.user.item.name }</h4>
                        </div>
                            :
                        <p>User does not exists.</p>
                    )
                }
            </div>
        )
    }
}

// Component Properties
View.propTypes = {
    user: PropTypes.object.isRequired,
    get: PropTypes.func.isRequired,
}

// Component State
function viewState(state) {
    return {
        user: state.user
    }
}

export default connect(viewState, { get })(View)