const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        items: [Items]
    }

    type Items {
        name: String
        description: String
        value: Int
        image: String
        tags: [Tags]
    }

    type Tags {
        tag: String
    }

    type Query {
        users: [User]
    }
`;

module.exports = typeDefs;