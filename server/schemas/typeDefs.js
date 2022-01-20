const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Tag {
        tag: String
    }

    type Item {
        itemId: ID
        name: String
        description: String
        value: Int
        image: String
        tags: [Tag]
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
        user(_id: ID, username: String): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String): User
        addItem(_id: ID!, content: itemData!): User
    }
`;

module.exports = typeDefs;