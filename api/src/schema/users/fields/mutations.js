// Imports
import { GraphQLString, GraphQLInt } from 'graphql'

// App Imports
import UserType from '../type'
import { create, remove } from '../resolvers'

// User create
export const userCreate = {
    type: UserType,
    args: {
        name: {
            name: 'name',
            type: GraphQLString
        },

        email: {
            email: 'email',
            type: GraphQLString
        }
    },
    resolve: create
}

// User remove
export const userRemove = {
    type: UserType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve: remove
}