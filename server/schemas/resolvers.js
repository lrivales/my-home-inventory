const { User } = require('../models');

const resolvers = {
    Query: {
        // me query

        // get all users
        users: async () => {
            return User.find({});
        },

        // query user by _id or username
        user: async (parent, { userId, username }) => {
            return User.findOne({
                $or: [{ _id: userId }, { username: username }]
            });
        },

        // query for item by itemId
        item: async (parent, { userId, itemId }) => {
            const user = await User.findOne({
                _id: userId
            });
            const item = user.items.id(itemId)
            return item;
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
        updateUser: async (parent, { userId, ...args }) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: userId },
                { ...args },
                { new: true }
            );
            return updatedUser;
        },

        // delete user
        deleteUser: async (parent, { userId }) => {
            const deletedUser = await User.findByIdAndDelete({ _id: userId });
            return deletedUser;
        },

        // add item
        addItem: async (parent, { userId, content }) => {
            const updatedUser = await User.findByIdAndUpdate(
                { _id: userId },
                { $addToSet: { items: content } },
                { new: true }
            );
            return updatedUser;
        },

        // update item
        updateItem: async(parent, { userId, itemId, content }) => {
            // insert updated item as new subdoc
            await User.findByIdAndUpdate(
                { _id: userId },
                { $addToSet: { items: content } },
                { new: true }
            );

            // delete old item
            const user = await User.findById({ _id: userId });
            user.items.id(itemId).remove();
            user.save(function (err) {
                if (err) return handleError(err);
            });
 
            return user;
        },

        // delete item
        deleteItem: async(parent, { userId, itemId }) => {
            const user = await User.findById({ _id: userId });
            user.items.id(itemId).remove();
            user.save(function (err) {
                if (err) return handleError(err);
            });

            return user;
        }
    }
};

module.exports = resolvers;