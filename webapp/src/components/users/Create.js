// Imports
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

// App Imports
import { routes } from '../../setup/routes'
import { create } from './api/actions'
import { messageShow, messageHide } from '../common/api/actions'

// Component
class Create extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: ''
        }
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submit = (event) => {
        event.preventDefault()

        // Hide old messages
        this.props.messageHide()

        this.props.messageShow('Creating user, please wait...')

        // Call API
        this.props.create(this.state)
            .then(response => {
                this.setState({
                    name: '',
                    email: '',
                })

                this.props.messageShow('User created successfully.')
            })
            .catch(error => {
                this.props.messageShow('Error creating user. Please try again.')
            })
    }

    render() {
        return(
            <div>
                <h1>User Create</h1>

                <p>
                    <Link to={ routes.users.list }>Back</Link>
                </p>

                {/* Form */}
                <form onSubmit={ this.submit }>
                    {/* Name */}
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        required="required"
                        value={ this.state.name }
                        onChange={ this.onChange }
                    />

                    <br /><br />

                    {/* email */}
                    <textarea
                        name="email"
                        placeholder="Your email"
                        required="required"
                        value={ this.state.email }
                        onChange={ this.onChange }
                    />

                    <br /><br />

                    {/* Submit */}
                    <button type="submit">Save</button>
                </form>
            </div>
        )
    }
}

// Component Properties
Create.propTypes = {
    create: PropTypes.func.isRequired,
    messageShow: PropTypes.func.isRequired,
    messageHide: PropTypes.func.isRequired
}

export default connect(null, { create, messageShow, messageHide })(Create)