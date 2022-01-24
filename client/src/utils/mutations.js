import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            items {
                _id
                name
                description
                value
            }
        }
    }
}
`;

const ADD_USER = gql`
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
            items {
                _id
                name
                description
                value
            }
        }
    }
}
`;

const UPDATE_USER = gql`
mutation UpdateUser($userId: ID!, $username: String, $email: String, $password: String) {
    updateUser(userId: $userId, username: $username, email: $email, password: $password) {
        _id
        username
        email
    }
}
`;

const DELETE_USER = gql`
mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
        _id
        username
        email
    }
}
`;

const ADD_ITEM = gql`
mutation AddItem($userId: ID!, $content: itemData!) {
    addItem(userId: $userId, content: $content) {
        items {
            _id
            name
            description
            value
        }
    }
}
`;

const UPDATE_ITEM = gql`
mutation UpdateItem($userId: ID!, $itemId: ID!, $content: itemData!) {
    updateItem(userId: $userId, itemId: $itemId, content: $content) {
        items {
            _id
            name
            description
            value
        }
    }
}
`;

const DELETE_ITEM = gql`
mutation DeleteItem($userId: ID!, $itemId: ID!) {
    deleteItem(userId: $userId, itemId: $itemId) {
        items {
            _id
            name
            description
            value
        }
    }
}
`;