const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Item {
        _id: ID
        name: String
        description: String
        value: Int
        image: String
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        items: [Item]
    }

    input itemData {
        name: String
        description: String
        value: Int
        image: String
    }

    type Query {
        users: [User],
        user(userId: ID, username: String): User
        item(userId: ID!, itemId: ID!): Item
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): User
        updateUser(userId: ID!, username: String, email: String, password: String): User
        deleteUser(userId: ID!): User
        addItem(userId: ID!, content: itemData!): User
    }
`;

module.exports = typeDefs;