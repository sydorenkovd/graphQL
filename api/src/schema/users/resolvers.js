// App Imports
import models from '../../models'

// Get user by ID
export async function getById(parentValue, { id }) {
    return await models.User.findOne({ where: { id }})
}

// Get all users
export async function getAll() {
    return await models.User.findAll()
}

// Create user
export async function create(parentValue, { name, email }) {
    return await models.User.create({
        name,
        email
    })
}

// Delete user
export async function remove(parentValue, { id }) {
    return await models.User.destroy({ where: { id }})
}