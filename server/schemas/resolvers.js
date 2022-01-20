const { User } = require('../models');

const resolvers = {
    Query: {
        // me query

        // get all users
        users: async () => {
            return User.find({});
        },

        // query user by _id or username
        user: async (parent, { _id, username }) => {
            return User.findOne({
                $or: [{ _id }, { username }]
            });
        },

        // query item by itemId
        item: async (parent, { itemId }) => {
            return User.items.itemId(itemId);
        }
    },

    Mutation: {
        // add user
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create(
                { username, email, password }
            );

            return user;
        },

        // update user
        updateUser: async (parent, { _id, ...args }) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id },
                { ...args },
                { new: true }
            );
            return updatedUser;
        },

        // delete user
        deleteUser: async (parent, { _id }) => {
            const deletedUser = await User.findByIdAndDelete({ _id });
            return deletedUser;
        },

        // add item
        addItem: async (parent, { _id, content }) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id },
                { $addToSet: { items: content } },
                { new: true }
            );
            return updatedUser;
        }

        // update item
        // delete item

        // add tag
        // update tag
        // delete tag
    }
};

module.exports = resolvers;