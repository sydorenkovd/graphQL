// Imports
import axios from 'axios'

// App Imports
import { routesApi } from '../../../setup/routes'
import { queryBuilder } from '../../../setup/helpers'

// Actions Types
export const USERS_GET_LIST_REQUEST = 'USERS/GET_LIST_REQUEST'
export const USERS_GET_LIST_RESPONSE = 'USERS/GET_LIST_RESPONSE'
export const USERS_GET_LIST_FAILURE = 'USERS/GET_LIST_FAILURE'
export const USERS_GET_REQUEST = 'USERS/GET_REQUEST'
export const USERS_GET_RESPONSE = 'USERS/GET_RESPONSE'
export const USERS_GET_FAILURE = 'USERS/GET_FAILURE'

// Actions

// Get list of users
export function getList(isLoading = true) {
    return dispatch => {
        dispatch({
            type: USERS_GET_LIST_REQUEST,
            isLoading
        })

        return axios.post(routesApi, queryBuilder({ type: 'query', operation: 'users', fields: ['id', 'name', 'email'] }))
            .then((response) => {
                dispatch({
                    type: USERS_GET_LIST_RESPONSE,
                    error: null,
                    list: response.data.data.users
                })
            })
            .catch((error) => {
                dispatch({
                    type: USERS_GET_LIST_FAILURE,
                    error: error
                })
            })
    }
}

// Get single user
export function get(id, isLoading = true) {
    return dispatch => {
        dispatch({
            type: USERS_GET_REQUEST,
            isLoading
        })

        return axios.post(routesApi, queryBuilder({ type: 'query', operation: 'user', data: { id: parseInt(id, 10) }, fields: ['id', 'name', 'email'] }))
            .then((response) => {
                dispatch({
                    type: USERS_GET_RESPONSE,
                    error: null,
                    item: response.data.data.user
                })
            })
            .catch((error) => {
                dispatch({
                    type: USERS_GET_FAILURE,
                    error: error
                })
            })
    }
}

// Create user
export function create(data) {
    return dispatch => {
        return axios.post(routesApi, queryBuilder({ type: 'mutation', operation: 'userCreate', data, fields: ['id'] }))
    }
}

// Remove user
export function remove(data) {
    return dispatch => {
        return axios.post(routesApi, queryBuilder({ type: 'mutation', operation: 'userRemove', data, fields: ['id'] }))
    }
}
